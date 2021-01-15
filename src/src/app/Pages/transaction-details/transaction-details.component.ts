import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
  Inject,
} from '@angular/core';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionFormComponent } from 'src/app/Components/transaction-form/transaction-form.component';
import { ConfigService } from 'src/app/Services/config.service';
import { NotifierService } from 'angular-notifier';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements AfterViewInit, OnInit {
  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) {}

  @ViewChild(TransactionFormComponent, { static: false })
  private transactionForm: TransactionFormComponent;

  id: string;
  icon: string;
  resetIcon: boolean = false;
  transactionNotFound: boolean = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  // Adds fragment to url
  @HostListener('window:popstate', ['$event'])
  onBrowserBackBtnClose(event: Event) {
    event.preventDefault();
    setTimeout(() => this.router.navigate([], { fragment: this.id }), 0);
  }

  ngAfterViewInit(): void {
    Promise.resolve(() => this.transactionForm.disable()).then(() => {
      this.transactionService.getTransactionById(this.id).subscribe({
        next: (transaction) => {
          if (transaction) {
            this.icon = transaction.Logo;
            this.transactionForm.setFormValues(transaction);
            this.transactionForm.enable();
          } else {
            this.transactionNotFound = true;
          }
        },
        error: () => (this.transactionNotFound = true),
      });
    });
  }

  save(form) {
    const transaction = {
      ID: this.id,
      Date: form.value.date,
      AccountID: form.value.account.AccountId,
      Category: form.value.category,
      Amount: form.value.amount,
      Currency: form.value.currency,
      Vendor: form.value.vendor,
      Merchant: form.value.merchant,
      Type: form.value.type,
      Note: form.value.note,
      Status: form.value.status,
    };

    if (this.resetIcon == true) {
      transaction['Logo'] = null;
    }

    this.transactionService.updateTransaction(transaction).subscribe({
      next: () => this.router.navigate(['/transactions']),
      error: () => this.transactionForm.enable(),
    });
  }

  setIconToNull() {
    this.icon = null;
    this.resetIcon = true;
  }

  async delete() {
    var isDemo = await this.configService.getValue('IsDemo');
    if (isDemo === true) {
      this.notifier.notify('error', 'Cannot delete transaction in demo mode');
      return;
    }

    if (confirm('Are you sure you want to delete this transaction')) {
      this.transactionService
        .deleteTransaction(this.id)
        .subscribe(() => this.router.navigate(['/transactions']));
    }
  }

  setCustomIcon() {
    const dialogRef = this.dialog.open(TransactionSetCustomIcon, {
      width: '400px',
      data: this.icon,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.icon = result;
      }
    });
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>Set Transaction Icon</h1>
    <div mat-dialog-content>
      <p>Icon Url</p>
      <mat-form-field style="width: 100%">
        <mat-label>Icon Url</mat-label>
        <input matInput [(ngModel)]="iconUrl" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="iconUrl" cdkFocusInitial>
        Ok
      </button>
    </div>
  `,
})
export class TransactionSetCustomIcon {
  constructor(
    public dialogRef: MatDialogRef<TransactionSetCustomIcon>,
    @Inject(MAT_DIALOG_DATA) public iconUrl: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
