import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TransactionsService } from '../../Services/transactions.service';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/Services/title.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    private transactionsService: TransactionsService,
    private loadingService: IsLoadingService,
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute
  ) {}

  @Input() account: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  transactions: Observable<any>;
  displayedColumns: string[] = [
    'Logo',
    'Date',
    'AccountID',
    'Amount',
    'Vendor',
    'Category',
    'Status',
    'Type',
  ];

  mobileColumns: string[] = ['Logo', 'Date', 'Amount', 'Vendor'];

  isLoading = this.loadingService.isLoading$({
    key: ['default', 'transactions-table'],
  });

  ngOnInit(): void {
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
        map((t) => {
          const table = new MatTableDataSource(t);
          table.sort = this.sort;
          table.paginator = this.paginator;
          return table;
        })
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
      this.displayedColumns = this.mobileColumns;
    }
  }

  scrollToTop() {
    const matTable = document.getElementById('transaction-table');
    matTable.scrollTop = 0;
  }
}
