import { TitleService } from 'src/app/Services/title.service';
import { Account } from './../../Models/account.model';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../Services/accounts.service';
import { IsLoadingService } from '@service-work/is-loading';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private loadingService: IsLoadingService,
    private titleService: TitleService
  ) {
    this.titleService.showBackButton.next(false);
  }

  accounts: Observable<Account[]> = this.accountsService
    .getAccounts()
    .pipe(
      tap(() =>
        this.loadingService.remove({ key: ['default', 'accounts-table'] })
      )
    );

  displayedColumns: string[] = ['name', 'currentbalance', 'availablebalance'];

  ngOnInit(): void {
    this.loadingService.add({ key: ['default', 'accounts-table'] });
  }
}
