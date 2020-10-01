import { Component, OnInit } from '@angular/core';
import { DatafeedsService } from 'src/app/Services/datafeeds.service';
import { ActivatedRoute } from '@angular/router';
import {
  AccountSettings,
  AccountsService,
  RefreshIntervals,
} from 'src/app/Services/accounts.service';
import { IsLoadingService } from '@service-work/is-loading';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  accountId: string;

  settingsForm: FormGroup = new FormGroup({
    refreshInterval: new FormControl('never'),
    generateAdjustments: new FormControl(true),
  });

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.loadingSerivce.add({ key: ['default', 'load-external-accounts'] });
    this.settingsForm.disable();

    this.accountsService.getAccountById(this.accountId).subscribe({
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

    this.accountsService.getAccountSettings(this.accountId).subscribe({
      next: (settings) => {
        if (settings) {
          this.settingsForm.controls.generateAdjustments.setValue(
            settings.GenerateAdjustments
          );
          this.settingsForm.controls.refreshInterval.setValue(
            (settings.RefreshInterval as string).toLowerCase()
          );
        }
        this.settingsForm.enable();
        this.settingsForm.valueChanges.subscribe(() =>
          this.saveAccountSettings()
        );
      },
    });
  }

  mapAccount(externalAccount): void {
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

  unMapAccount(externalAccount): void {
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

  saveAccountSettings(): void {
    this.loadingSerivce.add({ key: ['default', 'saveAccountSettings'] });
    this.settingsForm.disable({ emitEvent: false });

    const settings: AccountSettings = {
      AccountID: this.accountId,
      GenerateAdjustments: this.settingsForm.controls['generateAdjustments']
        .value,
      RefreshInterval: this.parseRefreshInterval(),
    };

    this.accountsService.setAccountSettings(settings).subscribe({
      complete: () => {
        this.loadingSerivce.remove({ key: ['default', 'saveAccountSettings'] });
        this.settingsForm.enable({ emitEvent: false });
      },
    });
  }

  parseRefreshInterval(): RefreshIntervals {
    console.log(this.settingsForm.controls.refreshInterval.value);
    switch (this.settingsForm.controls.refreshInterval.value) {
      case 'hourly':
        return RefreshIntervals.hourly;
      case 'bidaily':
        return RefreshIntervals.biDaily;
      case 'daily':
        return RefreshIntervals.Daily;
      case 'sixhours':
        return RefreshIntervals.sixHours;
      default:
        return RefreshIntervals.Never;
    }
  }
}
