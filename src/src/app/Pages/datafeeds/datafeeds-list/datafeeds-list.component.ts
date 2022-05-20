import { Component, OnInit, Input } from '@angular/core';
import { FinanceApiRequest } from 'src/app/Services/finance-api.request.service';
import { DatafeedsService } from '../../../Services/datafeeds.service';

@Component({
  selector: 'app-datafeeds-list',
  templateUrl: './datafeeds-list.component.html',
  styleUrls: ['./datafeeds-list.component.css'],
})
export class DatafeedsListComponent implements OnInit {
  constructor(
    private datafeedsService: DatafeedsService,
    private financeApi: FinanceApiRequest
  ) {}

  @Input() provider: string;
  datafeeds: any[] = [];
  displayedColumns: string[] = ['provider', 'vendor', 'lastUpdated', 'actions'];

  ngOnInit(): void {
    this.loadDatafeeds();
  }

  loadDatafeeds() {
    this.datafeedsService
      .getDatafeeds(this.provider)
      .subscribe((d) => (this.datafeeds = d));
  }

  deleteDatafeed(datafeed) {
    if (
      confirm(
        'Warning: This will also remove all external account mappings and is not reversable'
      )
    ) {
      this.datafeedsService
        .deleteDatafeed(datafeed.Provider, datafeed.VendorID)
        .subscribe(() => this.loadDatafeeds());
    }
  }

  reconnectDatafeed(datafeed) {
    switch (datafeed.Provider) {
      case 'TRUELAYER':
        this.reconnectTruelayer(datafeed);
        break;
      default:
        break;
    }
  }

  reconnectTruelayer(datafeed) {
    let baseUrl: string;
    let clientId = this.financeApi.get<string>(
      'DatafeedAuth/GetTrueLayerClientId'
    );
    let redirectUrl: string = `${FinanceApiRequest.BASE_URL}DatafeedAuth/TrueLayerAuthentication`;

    clientId.subscribe({
      next: (id) => {
        baseUrl = id.startsWith('sandbox-')
          ? 'https://auth.truelayer-sandbox.com/'
          : 'https://auth.truelayer.com/';
        console.log(baseUrl);
        window.open(
          baseUrl +
            '?response_type=code&client_id=' +
            id +
            '&scope=accounts%20balance%20transactions%20offline_access%20cards&redirect_uri=' +
            redirectUrl +
            '&response_mode=form_post&providers=uk-ob-all%20uk-oauth-all%20uk-cs-all%20uk-cs-mock&state=' +
            localStorage.getItem('id_token') +
            '|' +
            datafeed._id +
            `&provider_id=${datafeed.VendorID}`,
          '_blank'
        );
      },
      error: () => alert('Something went wrong'),
    });
  }
}
