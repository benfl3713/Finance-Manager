import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { shareReplay } from 'rxjs/operators';
import { TransactionFormComponent } from 'src/app/Components/transaction-form/transaction-form.component';
import { AccountsService } from 'src/app/Services/accounts.service';
import { TransactionsService } from 'src/app/Services/transactions.service';

@Component({
  templateUrl: './add-split-transaction.component.html',
  styleUrls: ['./add-split-transaction.component.css'],
})
export class AddSplitTransactionComponent implements OnInit, AfterViewInit {
  constructor(
    private datePipe: DatePipe,
    private transactionService: TransactionsService,
    private router: Router,
    private accountsService: AccountsService,
    private notifier: NotifierService
  ) {}
  @ViewChild(TransactionFormComponent, { static: false })
  private transactionForm: TransactionFormComponent;

  accounts = this.accountsService.getAccounts().pipe(shareReplay(1));
  displayedColumns = ['name', 'amount'];

  accountsToSplitBy = [];
  accountTableValid = false;

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.transactionForm.transactionForm.controls.date.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    }, 0);

    this.transactionForm.transactionForm.valueChanges.subscribe(() => {
      this.validate();
      this.calculateSplitAmounts();
    });
  }

  save(form) {
    const transaction = {
      Date: form.value.date,
      AccountID: null,
      Category: form.value.category,
      Amount: form.value.amount,
      Currency: form.value.currency,
      Vendor: form.value.vendor,
      Merchant: form.value.merchant,
      Type: form.value.type,
      Note: form.value.note,
      Status: form.value.status,
    };

    this.accountsToSplitBy.forEach((a) => {
      const accountTransaction = transaction;
      accountTransaction.AccountID = a.accountId;
      accountTransaction.Amount = +a.amount;

      this.transactionService.addTransaction(transaction).subscribe({
        error: () => {
          this.notifier.notify('error', 'Failed to create transactions');
          this.transactionForm.enable();
          return;
        },
      });
    });

    this.router.navigate(['/transactions']);
  }

  addAccountSplitBy(accountId: string, amount: number) {
    if (
      this.accountsToSplitBy.filter((a) => a.accountId == accountId).length > 0
    ) {
      this.accountsToSplitBy.splice(
        this.accountsToSplitBy.indexOf(
          this.accountsToSplitBy.filter((a) => a.accountId == accountId)[0]
        ),
        1
      );
    }

    if (amount && amount != 0) {
      this.accountsToSplitBy.push({ accountId, amount });
    }

    this.validate();
  }

  validate() {
    const total = this.accountsToSplitBy.reduce(
      (sum, current) => sum + current.amount,
      0
    );

    this.accountTableValid =
      this.transactionForm.transactionForm.controls.amount.value == total;
  }

  async calculateSplitAmounts() {
    if (this.accountsToSplitBy.length != 0) {
      return;
    }

    const subAmount =
      this.transactionForm.transactionForm.controls.amount.value /
      (await this.accounts.toPromise()).length;

    this.validate();
  }
}
