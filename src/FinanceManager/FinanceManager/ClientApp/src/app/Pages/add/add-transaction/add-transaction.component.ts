import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionFormComponent } from 'src/app/Components/transaction-form/transaction-form.component';
import { DatePipe } from '@angular/common';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit, AfterViewInit {
  constructor(
    private datePipe: DatePipe,
    private transactionService: TransactionsService,
    private router: Router
  ) {}
  @ViewChild(TransactionFormComponent, { static: false })
  private transactionForm: TransactionFormComponent;

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.transactionForm.transactionForm.controls.date.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    }, 0);
  }

  save(form) {
    const transaction = {
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

    this.transactionService.addTransaction(transaction).subscribe({
      next: () => this.router.navigate(['/transactions']),
      error: () => this.transactionForm.enable(),
    });
  }
}
