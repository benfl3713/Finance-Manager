import { Trade } from '../../Models/trade.model';
import { Injectable } from '@angular/core';
import { FinanceApiRequest } from '../finance-api.request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradesService {
  constructor(private financeApi: FinanceApiRequest) {}

  getTrades(): Observable<Trade[]> {
    return this.financeApi.get<Trade[]>('wealth/trades');
  }
}

