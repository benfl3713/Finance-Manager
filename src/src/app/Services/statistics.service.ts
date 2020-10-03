import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(
    private financeApi: FinanceApiRequest,
    private datePipe: DatePipe
  ) {}

  getBalanceHistory(dateFrom?: Date) {
    let date = this.datePipe.transform(dateFrom, 'yyyy-MM-ddTHH:mm:ss');
    return this.financeApi.get<any>(
      'statistics/GetBalanceHistory',
      dateFrom
        ? {
            dateFrom: date,
          }
        : null
    );
  }

  getSpentAmountPerCategory() {
    return this.financeApi.get<any>('statistics/GetSpentAmountPerCategory');
  }
}
