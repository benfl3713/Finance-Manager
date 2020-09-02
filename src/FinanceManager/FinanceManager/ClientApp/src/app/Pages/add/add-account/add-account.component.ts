import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent implements OnInit {
  constructor(
    private router: Router,
    private accountsService: AccountsService
  ) {}

  accountForm = new FormGroup({
    accountName: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  save() {
    const account = {
      AccountName: this.accountForm.controls.accountName.value,
    };
    this.accountsService.addNewAccount(account).subscribe({
      next: () => this.router.navigate(['/accounts']),
      error: (err) => console.log(err),
    });
  }

  cancel() {
    if (window.history.length > 0) {
      window.history.back();
    } else {
      this.router.navigate(['/accounts']);
    }
  }
}
