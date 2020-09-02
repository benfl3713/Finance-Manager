import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../Services/accounts.service';
import { IsLoadingService } from '@service-work/is-loading';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private loadingService: IsLoadingService
  ) {}

  accounts = this.accountsService
    .getAccounts()
    .pipe(
      tap(() =>
        this.loadingService.remove({ key: ['default', 'accounts-table'] })
      )
    );

  displayedColumns: string[] = ['name', 'availablebalance', 'pendingbalance'];

  ngOnInit(): void {
    this.loadingService.add({ key: ['default', 'accounts-table'] });
  }
}
