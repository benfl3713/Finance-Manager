import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../Services/transactions.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  transactions = this.transactionsService.getTransactions();
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

  ngOnInit(): void {}
}
