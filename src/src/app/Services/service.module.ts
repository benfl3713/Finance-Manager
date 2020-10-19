import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FinanceApiRequest } from './finance-api.request.service';
import { TitleService } from './title.service';
import { ConfigService } from './config.service';
import { StatisticsService } from './statistics.service';
import { GoalsService } from './goals.service';

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
  ],
})
export class ServiceModule {}
