import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  theme: string = ThemeService.CurrentTheme.value;

  save() {
    ThemeService.ChangeTheme(this.theme);
  }
}
