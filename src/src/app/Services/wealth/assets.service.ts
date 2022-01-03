import { Asset } from '../../Models/asset.model';
import { Injectable } from '@angular/core';
import { FinanceApiRequest } from '../finance-api.request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(private financeApi: FinanceApiRequest) {}

  getAssets(): Observable<Asset[]> {
    return this.financeApi.get<Asset[]>('wealth/assets');
  }
}

