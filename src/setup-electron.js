const path = require("path");
const fs = require("fs");

const configPath = "dist/assets/config.json";
if (!fs.existsSync(configPath)) {
  fs.rmSync(configPath);
}

const electronDefaultConfig = {
  $schema: "./config.schema.json",
  FinanceApiUrl: "http://localhost:5001/api",
  IsDemo: false,
};

fs.writeFileSync(configPath, JSON.stringify(electronDefaultConfig, null, 2));
