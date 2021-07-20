import { Account } from './../Models/account.model';
import { Injectable } from '@angular/core';
import { FinanceApiRequest } from './finance-api.request.service';
import { Observable } from 'rxjs';
import { AccountSettings } from '../Models/account-settings';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getAccounts(): Observable<Account[]> {
    return this.financeApi.get<any[]>('account');
  }

  getAccountById(id: string): Observable<Account> {
    return this.financeApi.get<any>(`account/${id}`);
  }

  addNewAccount(account: any) {
    return this.financeApi.post<void>(`account`, JSON.stringify(account));
  }

  deleteAccount(accountId: string) {
    return this.financeApi.delete<any>(`account/${accountId}`);
  }

  getSpentThisWeek(accountId: string) {
    return this.financeApi.get<number>(`account/${accountId}/GetSpentThisWeek`);
  }

  getAccountSettings(accountId: string): Observable<AccountSettings> {
    return this.financeApi.get<AccountSettings>(`account/${accountId}/GetAccountSettings`);
  }

  setAccountSettings(accountSettings: AccountSettings) {
    return this.financeApi.post<void>(
      `account/${accountSettings.AccountID}/SetAccountSettings`,
      JSON.stringify(accountSettings)
    );
  }
}

