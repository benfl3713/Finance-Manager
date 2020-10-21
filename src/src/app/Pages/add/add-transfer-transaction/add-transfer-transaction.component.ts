import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import { TransactionFormComponent } from 'src/app/Components/transaction-form/transaction-form.component';
import { AccountsService } from 'src/app/Services/accounts.service';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { accountComparer } from 'src/app/Components/transaction-form/transaction-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  templateUrl: './add-transfer-transaction.component.html',
  styleUrls: ['./add-transfer-transaction.component.css'],
})
export class AddTransferTransactionComponent implements OnInit, AfterViewInit {
  constructor(
    private datePipe: DatePipe,
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  @ViewChild(TransactionFormComponent, { static: false })
  private transactionForm: TransactionFormComponent;

  accounts$ = this.accountsService.getAccounts().pipe(shareReplay(1));

  transferForm = new FormGroup({
    accountFrom: new FormControl(null, [Validators.required]),
    accountTo: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.transactionForm.transactionForm.controls.date.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
      this.transactionForm.transactionForm.controls.type.setValue('Transfer');
      this.transactionForm.transactionForm.controls.category.setValue(
        'Transfer'
      );
      this.transactionForm.transactionForm.controls.vendor.setValue('Transfer');
    }, 0);
  }

  save(form) {
    const transaction = {
      Date: form.value.date,
      AccountID: this.transferForm.value.accountFrom.ID,
      Category: form.value.category,
      Amount: form.value.amount * -1,
      Currency: form.value.currency,
      Vendor: form.value.vendor,
      Merchant: form.value.merchant,
      Type: form.value.type,
      Note: form.value.note,
      Status: form.value.status,
    };

    this.transactionsService.addTransaction(transaction).subscribe({
      next: () => {
        transaction.AccountID = this.transferForm.value.accountTo.ID;
        transaction.Amount = form.value.amount;
        this.transactionsService
          .addTransaction(transaction)
          .subscribe({ next: () => this.router.navigate(['/transactions']) });
      },
      error: () => {
        this.notifier.notify('error', 'Failed to create transactions');
        this.transactionForm.enable();
        return;
      },
    });
  }

  compareAccounts(a1, a2) {
    return accountComparer(a1, a2);
  }
}
