import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { DatafeedsService } from 'src/app/Services/datafeeds.service';
import { IsLoadingService } from '@service-work/is-loading';
import { of, Observable } from 'rxjs';
import { TitleService } from 'src/app/Services/title.service';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from 'src/app/Services/config.service';
import { Account } from 'src/app/Models/account.model';

@Component({
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id');
  account$: Observable<Account> = this.accountsService
    .getAccountById(this.id)
    .pipe(shareReplay(1))
    .pipe(
      tap((a) => setTimeout(() => this.titleService.setTitle(a.AccountName), 0))
    )
    .pipe(
      catchError(() => {
        this.accountNotFound = true;
        return of(null);
      })
    );

  spentThisWeek: number;

  isAccountMapped = this.datafeedsService
    .doesAccountHaveExternalMappings(this.id)
    .pipe(shareReplay(1));

  accountNotFound = false;

  isRefreshEnabledLoading = this.loadingService.isLoading$({
    key: ['default', 'refresh-account'],
  });

  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router,
    private datafeedsService: DatafeedsService,
    private loadingService: IsLoadingService,
    private titleService: TitleService,
    private notifier: NotifierService,
    private configService: ConfigService
  ) {
    this.titleService.showBackButton.next(true);
  }

  ngOnInit(): void {
    this.accountsService
      .getSpentThisWeek(this.id)
      .pipe(
        catchError((ex) => {
          console.log(ex);
          return of(0);
        })
      )
      .subscribe((v) => (this.spentThisWeek = v ?? 0));
  }

  refreshAccount(): void {
    if (
      confirm(
        'Are you sure you want to refresh this account.\nThis will fetch the latest data from your datafeeds'
      )
    ) {
      this.loadingService.add({ key: ['default', 'refresh-account'] });
      this.datafeedsService.refreshAccount(this.id).subscribe({
        next: () => alert('Account will refresh in the background'),
        error: (ex) => {
          alert('Something went wrong\nCheck the console for more info');
          console.log(ex);
        },
        complete: () =>
          this.loadingService.remove({ key: ['default', 'refresh-account'] }),
      });
    }
  }

  async delete(accountId: string): Promise<void> {
    const isDemo = await this.configService.getValue('IsDemo');
    if (isDemo === true) {
      this.notifier.notify('error', 'Cannot delete account in demo mode');
      return;
    }

    if (
      confirm(
        'Are you sure you want to delete this account.\nIt will delete all associated transactions'
      )
    ) {
      this.accountsService
        .deleteAccount(accountId)
        .subscribe(() => this.router.navigate(['/accounts']));
    }
  }
}
