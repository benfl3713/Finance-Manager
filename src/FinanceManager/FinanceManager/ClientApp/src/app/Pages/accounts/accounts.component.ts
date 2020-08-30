import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../Services/accounts.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor(private accountsService: AccountsService) {}

  accounts = this.accountsService.getAccounts();

  displayedColumns: string[] = ['name', 'availablebalance', 'pendingbalance'];

  ngOnInit(): void {}
}
