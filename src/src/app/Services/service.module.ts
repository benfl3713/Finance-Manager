import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FinanceApiRequest } from './finance-api.request.service';
import { TitleService } from './title.service';
import { ConfigService } from './config.service';
import { StatisticsService } from './statistics.service';
import { GoalsService } from './goals.service';
import { ThemeService } from './theme.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    FinanceApiRequest,
    AuthService,
    TitleService,
    ConfigService,
    StatisticsService,
    GoalsService,
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: ThemeService.LoadTheme$,
      deps: [],
      multi: true,
    },
  ],
})
export class ServiceModule {}
