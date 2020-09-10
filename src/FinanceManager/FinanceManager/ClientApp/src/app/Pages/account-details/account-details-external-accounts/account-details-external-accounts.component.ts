import { Component, OnInit } from '@angular/core';
import { DatafeedsService } from 'src/app/Services/datafeeds.service';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  templateUrl: './account-details-external-accounts.component.html',
  styleUrls: ['./account-details-external-accounts.component.css'],
})
export class AccountDetailsExternalAccountsComponent implements OnInit {
  constructor(
    private datafeedsService: DatafeedsService,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private loadingSerivce: IsLoadingService
  ) {}

  account: any = {};
  externalAccounts: any[] = [];
  displayedColumns: string[] = ['provider', 'vendor', 'accountName', 'actions'];
  disableActions: boolean = false;

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    this.loadingSerivce.add({ key: ['default', 'load-external-accounts'] });

    this.accountsService.getAccountById(accountId).subscribe({
      next: (account) => {
        this.account = account;
        this.datafeedsService.getExternalAccounts().subscribe({
          next: (ea) => {
            this.externalAccounts = ea;
            this.disableActions = false;
          },
          complete: () =>
            this.loadingSerivce.remove({
              key: ['default', 'load-external-accounts'],
            }),
        });
      },
      error: (ex) => alert(ex),
    });
  }

  mapAccount(externalAccount) {
    this.disableActions = true;
    this.loadingSerivce.add({ key: ['default', 'map-account'] });
    this.datafeedsService
      .addExternalAccountMapping(
        externalAccount.Provider,
        externalAccount.VendorID,
        this.account.ID,
        externalAccount.AccountID
      )
      .subscribe({
        complete: () => {
          this.loadingSerivce.remove({ key: ['default', 'map-account'] });
          this.ngOnInit();
        },
      });
  }

  unMapAccount(externalAccount) {
    this.disableActions = true;
    this.loadingSerivce.add({ key: ['default', 'unmap-account'] });
    this.datafeedsService
      .removeExternalAccountMapping(this.account.ID, externalAccount.AccountID)
      .subscribe({
        complete: () => {
          this.loadingSerivce.remove({ key: ['default', 'unmap-account'] });
          this.ngOnInit();
        },
      });
  }

  showUnlinkButton(externalAccount: any): boolean {
    return (
      externalAccount.Mapped === true &&
      externalAccount.MappedAccount === this.account.ID
    );
  }

  disableUnlinkButton(externalAccount: any): boolean {
    return externalAccount.MappedAccount !== this.account.ID;
  }
}
