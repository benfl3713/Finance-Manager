import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { DatafeedsService } from 'src/app/Services/datafeeds.service';
import { IsLoadingService } from '@service-work/is-loading';
import { of } from 'rxjs';

@Component({
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router,
    private datafeedsService: DatafeedsService,
    private loadingService: IsLoadingService
  ) {}

  ngOnInit(): void {}

  account$ = this.accountsService
    .getAccountById(this.route.snapshot.paramMap.get('id'))
    .pipe(shareReplay(1))
    .pipe(
      catchError(() => {
        this.accountNotFound = true;
        return of();
      })
    );

  isAccountMapped = this.datafeedsService.doesAccountHaveExternalMappings(
    this.route.snapshot.paramMap.get('id')
  );

  accountNotFound = false;

  isRefreshEnabledLoading = this.loadingService.isLoading$({
    key: ['default', 'refresh-account'],
  });

  refreshAccount() {
    if (
      confirm(
        'Are you sure you want to refresh this account.\nThis will fetch the latest data from your datafeeds'
      )
    ) {
      this.loadingService.add({ key: ['default', 'refresh-account'] });
      this.datafeedsService
        .refreshAccount(this.route.snapshot.paramMap.get('id'))
        .subscribe({
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

  delete(accountId: string) {
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
