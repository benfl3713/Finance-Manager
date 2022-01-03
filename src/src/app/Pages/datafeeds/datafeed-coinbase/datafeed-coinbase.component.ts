import { Component } from '@angular/core';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';

@Component({
  templateUrl: './datafeed-coinbase.component.html',
  styleUrls: ['./datafeed-coinbase.component.css'],
})
export class DatafeedCoinbaseComponent {
  constructor(private financeApi: FinanceApiRequest) {}

  baseUrl = 'https://www.coinbase.com';
  private clientId = this.financeApi.get<string>(
    'DatafeedAuth/GetCoinbaseClientId'
  );
  redirectUrl = `${FinanceApiRequest.BASE_URL}DatafeedAuth/CoinBaseAuthentication`;

  LinkCoinBase() {
    this.clientId.subscribe({
      next: (id) => {
        window.open(
          `${
            this.baseUrl
          }/oauth/authorize?response_type=code&client_id=${id}&redirect_uri=${
            this.redirectUrl
          }&state=${localStorage.getItem(
            'id_token'
          )}&account=all&scope=wallet:accounts:read,wallet:transactions:read
      `,
          '_blank'
        );
      },
    });
  }
}
