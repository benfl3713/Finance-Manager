import { Component } from '@angular/core';
import { Asset } from 'src/app/Models/asset.model';
import { AssetsService } from 'src/app/Services/wealth/assets.service';

@Component({
  templateUrl: './wealth-assets.component.html',
  styleUrls: ['./wealth-assets.component.css']
})
export class WealthAssetsComponent {

  constructor(private assetsService: AssetsService) { }

  assets = this.assetsService.getAssets();
  displayedColumns = ["name", "code", "balance", "currency", "type", "source", "updated"]

  getAssetCode(asset: Asset){
    if (asset.Exchange) {
      return asset.Code + " | " + asset.Exchange;
    }

    return asset.Code;
  }
}
