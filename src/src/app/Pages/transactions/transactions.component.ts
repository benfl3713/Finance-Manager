import { Component, Input, ViewChild } from '@angular/core';
import { TransactionsService } from '../../Services/transactions.service';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ColDef, GridApi } from 'ag-grid-community';
import { ImageFormatterComponent } from 'src/app/Components/table-formatters/IconFormatterComponent';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  constructor(
    private transactionsService: TransactionsService,
    private loadingService: IsLoadingService,
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private titleCasePipe: TitleCasePipe
  ) {}

  @Input() account: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private gridApi!: GridApi;
  transactions: Observable<any>;
  columnDefs: ColDef[] = [
    {
      field: 'Logo',
      cellRenderer: ImageFormatterComponent,
      flex: 0,
      width: 80,
      headerName: '',
      filter: false,
      sortable: false,
    },
    {
      field: 'ID',
      hide: true,
    },
    {
      field: 'Date',
      valueFormatter: (p) => this.datePipe.transform(p.value, 'dd-MM-yyyy'),
      sort: 'desc',
      filter: 'agDateColumnFilter',
      filterValueGetter: (p) => new Date(p.data.Date),
    },
    { field: 'AccountName' },
    {
      field: 'Amount',
      filter: 'agNumberColumnFilter',
      valueFormatter: (p) =>
        this.currencyPipe.transform(p.value, p.data.Currency),
      cellStyle: (p) => ({
        color: (p.value as number) >= 0 ? 'green' : 'red',
      }),
    },
    { field: 'Vendor' },
    { field: 'Category' },
    {
      field: 'Status',
      valueFormatter: (p) => this.titleCasePipe.transform(p.value),
    },
    { field: 'Type' },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

  mobileColumns: string[] = ['Logo', 'Date', 'Amount', 'Vendor'];
  theme =
    (localStorage.getItem('table-theme') ?? 'ag-theme-alpine') +
    (ThemeService.CurrentTheme.value == 'dark' ? '-dark' : '');

  isLoading = this.loadingService.isLoading$({
    key: ['default', 'transactions-table'],
  });

  loadData(params): void {
    this.gridApi = params.api;
    this.loadingService.add({ key: ['default', 'transactions-table'] });
    this.transactions = this.account
      ? this.transactionsService.getTransactions({ accountId: this.account })
      : this.transactionsService.getTransactions();

    this.transactions = this.transactions
      .pipe(
        tap(() =>
          this.loadingService.remove({ key: ['default', 'transactions-table'] })
        )
      )
      .pipe(
        finalize(() => {
          setTimeout(() => {
            if (this.route.snapshot.fragment) {
              document
                .getElementById(this.route.snapshot.fragment)
                .scrollIntoView();
            }
          }, 0);
        })
      );

    if (this.deviceService.isMobile()) {
      this.columnDefs = this.columnDefs.filter(f => this.mobileColumns.includes(f.field));
    }
  }

  scrollToTop() {
    const matTable = document.getElementById('transaction-table');
    matTable.scrollTop = 0;
  }

  exportDataAsCsv() {
    this.gridApi.exportDataAsCsv({
      columnKeys: [
        'ID',
        'Date',
        'AccountName',
        'Amount',
        'Vendor',
        'Category',
        'Status',
        'Type',
      ],
      suppressQuotes: true,
      fileName: 'transactions.csv',
    });
  }

  editTransaction(params) {
    console.log(window.location.origin + '/transactions/' + params.data.ID);
    window.open(
      window.location.origin + '/transactions/' + params.data.ID,
      '_blank'
    );
  }
}
