import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { AccountsService } from 'src/app/Services/accounts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private accountsService: AccountsService
  ) {}

  @Output() save: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  transactionForm = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    account: new FormControl({ AccountID: null, AccountName: null }, [
      Validators.required,
    ]),
    amount: new FormControl(null, [Validators.required]),
    currency: new FormControl('GBP', [Validators.required]),
    status: new FormControl('SETTLED', [Validators.required]),
    type: new FormControl(null),
    vendor: new FormControl(null),
    category: new FormControl(null),
    merchant: new FormControl(null),
    note: new FormControl(null),
  });

  accounts$ = this.accountsService.getAccounts().pipe(
    map((accounts) =>
      accounts.map((a) => {
        return { AccountId: a.ID, AccountName: a.AccountName };
      })
    )
  );

  ngOnInit(): void {}

  setFormValues(transaction: any) {
    try {
      this.transactionForm.controls.date.setValue(
        this.datePipe.transform(transaction.Date, 'yyyy-MM-dd')
      );
      this.transactionForm.controls.account.setValue({
        AccountId: transaction.AccountID,
        AccountName: transaction.AccountName,
      });
      this.transactionForm.controls.amount.setValue(transaction.Amount);
      this.transactionForm.controls.currency.setValue(transaction.Currency);
      this.transactionForm.controls.status.setValue(transaction.Status);
      this.transactionForm.controls.type.setValue(transaction.Type);
      this.transactionForm.controls.vendor.setValue(transaction.Vendor);
      this.transactionForm.controls.category.setValue(transaction.Category);
      this.transactionForm.controls.merchant.setValue(transaction.Merchant);
      this.transactionForm.controls.note.setValue(transaction.Note);
    } catch (ex) {
      console.log(ex);
    }
  }

  enable() {
    this.transactionForm.enable();
  }

  disable() {
    this.transactionForm.disable();
  }

  submit() {
    this.disable();
    this.save.emit(this.transactionForm);
  }

  cancel() {
    if (window.history.length > 0) {
      window.history.back();
    } else {
      this.router.navigate(['/transactions']);
    }
  }

  accountComparer(a1, a2) {
    return a1.AccountName == a2.AccountName && a1.AccountId == a2.AccountId;
  }
}
