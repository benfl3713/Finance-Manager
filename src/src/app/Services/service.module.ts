import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FinanceApiRequest } from './finance-api.request.service';
import { TitleService } from './title.service';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [FinanceApiRequest, AuthService, TitleService, ConfigService],
})
export class ServiceModule {}
