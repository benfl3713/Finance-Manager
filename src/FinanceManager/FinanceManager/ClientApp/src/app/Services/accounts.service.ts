import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getAccounts(): Observable<any[]> {
    return this.financeApi.get<any[]>('accounts');
  }
}
