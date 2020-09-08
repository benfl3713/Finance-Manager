import { Injectable } from '@angular/core';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

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

    return this.financeApi.get<any>('datafeeds', query);
  }

  getExternalAccounts(): Observable<any> {
    return this.financeApi.get<any>('datafeed/GetExternalAccounts');
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

  removeExternalAccountMapping(accountId: string) {
    var query = {
      accountId,
    };

    return this.financeApi.delete(
      'datafeed/RemoveExternalAccountMapping',
      query
    );
  }
}
