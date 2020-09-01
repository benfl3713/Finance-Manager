import { Component, OnInit, Input } from '@angular/core';
import { TransactionsService } from '../../Services/transactions.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  @Input() account: string;

  transactions;
  displayedColumns: string[] = [
    'logo',
    'date',
    'account',
    'amount',
    'vendor',
    'category',
    'merchant',
    'type',
  ];

  ngOnInit(): void {
    this.transactions = this.account
      ? this.transactionsService.getTransactionsByAccountId(this.account)
      : this.transactionsService.getTransactions();
  }
}
