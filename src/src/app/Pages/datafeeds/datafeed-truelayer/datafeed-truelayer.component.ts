import { Component, OnInit } from '@angular/core';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { DatafeedsService } from '../../../Services/datafeeds.service';

@Component({
  templateUrl: './datafeed-truelayer.component.html',
  styleUrls: ['./datafeed-truelayer.component.css'],
})
export class DatafeedTruelayerComponent implements OnInit {
  constructor(private financeApi: FinanceApiRequest) {}
  private baseUrl: string;
  private clientId = this.financeApi.get<string>(
    'DatafeedAuth/GetTrueLayerClientId'
  );
  private redirectUrl: string = `${FinanceApiRequest.BASE_URL}DatafeedAuth/TrueLayerAuthentication`;

  ngOnInit(): void {}

  LinkTrueLayer() {
    this.clientId.subscribe({
      next: (id) => {
        this.baseUrl = id.startsWith('sandbox-')
          ? 'https://auth.truelayer-sandbox.com/'
          : 'https://auth.truelayer.com/';
        console.log(this.baseUrl);
        window.open(
          this.baseUrl +
            '?response_type=code&client_id=' +
            id +
            '&scope=accounts%20balance%20cards%20transactions%20offline_access&redirect_uri=' +
            this.redirectUrl +
            '&response_mode=form_post&providers=uk-ob-all%20uk-oauth-all%20uk-cs-all%20uk-cs-mock&state=' +
            localStorage.getItem('id_token'),
          '_blank'
        );
      },
      error: () => alert('Something went wrong'),
    });
  }
}
