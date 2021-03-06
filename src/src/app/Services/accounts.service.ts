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

  getAccountById(id: string): Observable<any> {
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

  getAccountSettings(accountId: string) {
    return this.financeApi.get<any>(`account/${accountId}/GetAccountSettings`);
  }

  setAccountSettings(accountSettings: AccountSettings) {
    return this.financeApi.post<void>(
      `account/${accountSettings.AccountID}/SetAccountSettings`,
      JSON.stringify(accountSettings)
    );
  }
}

export interface AccountSettings {
  AccountID: string;
  RefreshInterval: RefreshIntervals;
  GenerateAdjustments: string;
}

export enum RefreshIntervals {
  Never,
  hourly,
  sixHours,
  biDaily,
  Daily,
}
