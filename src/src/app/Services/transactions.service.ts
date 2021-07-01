import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getTransactions(filters?: { accountId?: string }): Observable<any[]> {
    return this.financeApi.get<any[]>('transaction', filters);
  }

  getTransactionById(transactionId: string): Observable<any> {
    return this.financeApi.get<any[]>(`transaction/${transactionId}`);
  }

  addTransaction(transaction: any): Observable<void> {
    return this.financeApi.post('transaction', JSON.stringify(transaction));
  }

  updateTransaction(transaction: any): Observable<void> {
    return this.financeApi.put(`transaction/${transaction.ID}`, JSON.stringify(transaction));
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return this.financeApi.delete(`transaction/${transactionId}`);
  }
}
