import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getBalanceHistory() {
    return this.financeApi.get<any>('statistics/GetBalanceHistory');
  }
}
