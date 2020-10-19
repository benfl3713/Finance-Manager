import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AccountsService } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  @Output() save: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  accounts$ = this.accountsService.getAccounts().pipe(
    map((accounts) =>
      accounts.map((a) => {
        return { AccountId: a.ID, AccountName: a.AccountName };
      })
    )
  );

  goalForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    account: new FormControl({ AccountID: null, AccountName: null }, [
      Validators.required,
    ]),
    amount: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  submit() {
    this.disable();
    this.save.emit(this.goalForm);
  }

  cancel() {
    if (window.history.length > 0) {
      window.history.back();
    } else {
      this.router.navigate(['/transactions']);
    }
  }

  enable() {
    this.goalForm.enable();
  }

  disable() {
    this.goalForm.disable();
  }

  accountComparer(a1, a2) {
    return a1.AccountName == a2.AccountName && a1.AccountId == a2.AccountId;
  }

  setFormValues(goal: any) {
    try {
      this.goalForm.controls.date.setValue(
        this.datePipe.transform(goal.Date, 'yyyy-MM-dd')
      );
      this.goalForm.controls.account.setValue({
        AccountId: goal.AccountId,
        AccountName: goal.AccountName,
      });
      this.goalForm.controls.amount.setValue(goal.GoalAmount);
      this.goalForm.controls.name.setValue(goal.Name);
    } catch (ex) {
      console.log(ex);
    }
  }
}
