import { Injectable } from '@angular/core';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatafeedsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getDatafeeds(datafeedType?: string): Observable<any> {
    var query: Params = {};
    if (datafeedType) {
      query.datafeedType = datafeedType.toUpperCase();
    }

    return this.financeApi.get<any>('datafeed', query);
  }

  deleteDatafeed(provider: string, vendorId: string): Observable<void> {
    var query: Params = {
      provider,
      vendorId,
    };
    return this.financeApi.delete<void>('datafeed/DeleteDatafeed', query);
  }

  getExternalAccounts(): Observable<any[]> {
    return this.financeApi.get<any[]>('datafeed/GetExternalAccounts');
  }

  doesAccountHaveExternalMappings(accountId: string): Observable<boolean> {
    return this.financeApi
      .get<any[]>('datafeed/GetMappedExternalAccounts', { accountId })
      .pipe(
        map((accounts) => {
          return accounts.some((a) => a.MappedAccount === accountId);
        })
      );
  }

  addExternalAccountMapping(
    provider: string,
    vendorID: string,
    accountID: string,
    externalAccountID: string
  ): Observable<void> {
    var body = {
      provider,
      vendorID,
      accountID,
      externalAccountID,
    };

    return this.financeApi.post(
      'datafeed/AddExternalAccountMapping',
      JSON.stringify(body)
    );
  }

  removeExternalAccountMapping(accountId: string, externalAccountId: string) {
    var query = {
      accountId,
      externalAccountId,
    };

    return this.financeApi.delete(
      'datafeed/RemoveExternalAccountMapping',
      query
    );
  }

  refreshAccount(accountId: string) {
    var query = {
      accountId,
    };

    return this.financeApi.get('datafeed/RefreshAccount', query);
  }
}
