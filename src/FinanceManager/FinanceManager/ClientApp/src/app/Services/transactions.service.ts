import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getTransactions(): Observable<any[]> {
    return this.financeApi.get<any[]>('transactions');
  }
}
