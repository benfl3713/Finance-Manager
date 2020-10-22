const { app, BrowserWindow, Menu } = require("electron");
const prompt = require("electron-prompt");
const path = require("path");
const fs = require("fs");
const isMac = process.platform === "darwin";
const configPath = path.join(__dirname, `/dist/assets/config.json`);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#2962ff",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenu(Menu.buildFromTemplate(menuTemplate));

  // For some reason we have to double load for it to work
  loadContent();
  setTimeout(() => loadContent(), 200);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.webContents.on("did-fail-load", () => {
    console.log("on browser reload it did-fail-load and reloaded the app");
    loadContent();
  });

  if (getConfig()?.FinanceApiUrl === "${FinanceApiUrl}") {
    editFinanceApiValue();
  }
}

function loadContent() {
  console.log(path.join(__dirname, `/dist/index.html`));
  mainWindow.loadFile(path.join(__dirname, `/dist/index.html`));
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      isMac ? { role: "close" } : { role: "quit" },
      {
        label: "Set FinanceAPI Url",
        click: editFinanceApiValue,
      },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

async function editFinanceApiValue() {
  let config = getConfig();

  prompt({
    title: "Finance API Url",
    label: "URL:",
    value: config?.FinanceApiUrl,
    inputAttrs: {
      type: "text",
      required: true,
    },
    type: "input",
  })
    .then((r) => {
      if (r === null) {
        console.log("user cancelled");
      } else {
        console.log("Setting url to", r);
        config.FinanceApiUrl = r;

        fs.writeFileSync(configPath, JSON.stringify(config));
        //mainWindow.reload();
        loadContent();
      }
    })
    .catch(console.error);
}

function getConfig() {
  // Create config file if it doesn't already exist
  if (!fs.existsSync(configPath)) {
    console.log(path.join(__dirname, `/dist/assets/template.config.json`));
    fs.writeFileSync(
      configPath,
      fs.readFileSync(
        path.join(__dirname, `/dist/assets/template.config.json`),
        { encoding: "utf8" }
      )
    );
  }

  return JSON.parse(
    fs.readFileSync(configPath, {
      encoding: "utf8",
    })
  );
}
