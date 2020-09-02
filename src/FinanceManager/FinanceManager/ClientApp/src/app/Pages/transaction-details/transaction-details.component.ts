import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionsService } from 'src/app/Services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TransactionFormComponent } from 'src/app/Components/transaction-form/transaction-form.component';

@Component({
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements AfterViewInit {
  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute
  ) {}

  @ViewChild(TransactionFormComponent, { static: false })
  private transactionForm: TransactionFormComponent;

  ngAfterViewInit(): void {
    Promise.resolve(() => this.transactionForm.disable()).then(() => {
      this.transactionService
        .getTransactionById(this.route.snapshot.paramMap.get('id'))
        .subscribe((transaction) => {
          this.transactionForm.setFormValues(transaction);
          this.transactionForm.enable();
        });
    });
  }
}
