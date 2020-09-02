import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getTransactions(): Observable<any[]> {
    return this.financeApi.get<any[]>('transactions');
  }

  getTransactionsByAccountId(accountId: string): Observable<any[]> {
    var queryParams: Params = {
      accountId: accountId,
    };
    return this.financeApi.get<any[]>('transactions', queryParams);
  }

  getTransactionById(transactionId: string): Observable<any> {
    return this.financeApi.get<any[]>(`transaction/${transactionId}`);
  }

  addTransaction(transaction: any): Observable<void> {
    return this.financeApi.post('transaction', JSON.stringify(transaction));
  }
}
