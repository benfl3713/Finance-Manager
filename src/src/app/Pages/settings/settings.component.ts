import { Component } from '@angular/core';
import { ConfigService } from 'src/app/Services/config.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private configService: ConfigService) {}

  theme: string = ThemeService.CurrentTheme.value;
  tableTheme: string = localStorage.getItem('table-theme') ?? 'ag-theme-alpine'
  enable_wealth: string = localStorage.getItem('enable_wealth') ?? "true";

  save() {
    ThemeService.ChangeTheme(this.theme);
    this.configService.setClientValue('enable_wealth', this.enable_wealth);
    localStorage.setItem('table-theme', this.tableTheme);
  }
}
