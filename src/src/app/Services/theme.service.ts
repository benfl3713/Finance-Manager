import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  public static LoadTheme$(): () => Promise<void> {
    return () =>
      new Promise<void>((resolve) => {
        ThemeService.LoadTheme();
        resolve();
      });
  }

  public static CurrentTheme = new BehaviorSubject<string>('light');

  public static LoadTheme() {
    var element = document.getElementById('app-entry');
    this.CurrentTheme.next(localStorage.getItem('theme') || 'light');
    if (this.CurrentTheme.value == 'light') {
      element.classList.remove('finance-dark-theme');
      Chart.defaults.global.defaultFontColor = '#646464';
    } else {
      element.classList.add('finance-dark-theme');
      Chart.defaults.global.defaultFontColor = '#f2f2f2';
    }
  }

  public static ChangeTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.LoadTheme();
  }
}
