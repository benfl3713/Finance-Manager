import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

@Component({
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  account$ = this.accountsService
    .getAccountById(this.route.snapshot.paramMap.get('id'))
    .pipe(shareReplay(1));

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
