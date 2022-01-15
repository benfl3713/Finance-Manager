import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trade } from 'src/app/Models/trade.model';
import { AssetsService } from 'src/app/Services/wealth/assets.service';
import { TradesService } from 'src/app/Services/wealth/trades.service';

@Component({
  templateUrl: './wealth-trades.component.html',
  styleUrls: ['./wealth-trades.component.css'],
})
export class WealthTradesComponent {
  constructor(
    private tradeService: TradesService,
    private assetService: AssetsService
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = [
    'TradeDateTime',
    'AssetName',
    'Amount',
    'Currency',
    'Description',
    'Status',
    'Source',
    'Type',
  ];

  data = zip(this.tradeService.getTrades(), this.assetService.getAssets()).pipe(
    map(([trades, assets]) => {
      const combined = trades.map((t) => {
        const te = t as TradeExtra;
        te.AssetName = assets.find((a) => a.Id === t.AssetId).Name;
        return te;
      });
      const table = new MatTableDataSource(combined);
      table.sort = this.sort;
      table.paginator = this.paginator;
      return table;
    })
  );

  scrollToTop() {
    const matTable = document.getElementById('trade-table');
    matTable.scrollTop = 0;
  }
}

interface TradeExtra extends Trade {
  AssetName: string;
}
