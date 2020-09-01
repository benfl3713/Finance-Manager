import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

@Component({
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  account$ = this.accountsService
    .getAccountById(this.route.snapshot.paramMap.get('id'))
    .pipe(shareReplay(1));
}
