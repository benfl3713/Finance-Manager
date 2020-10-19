import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoalFormComponent } from 'src/app/Components/goal-form/goal-form.component';
import { GoalsService } from 'src/app/Services/goals.service';

@Component({
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css'],
})
export class AddGoalComponent implements OnInit, AfterViewInit {
  constructor(
    private datePipe: DatePipe,
    private goalService: GoalsService,
    private router: Router
  ) {}

  @ViewChild(GoalFormComponent, { static: false })
  private goalFormComponent: GoalFormComponent;

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.goalFormComponent.goalForm.controls.date.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    }, 0);
  }

  save(form) {
    const goal = {
      Date: form.value.date,
      AccountId: form.value.account.AccountId,
      GoalAmount: form.value.amount,
      Name: form.value.name,
    };

    this.goalService.addGoal(goal).subscribe({
      next: () => this.router.navigate(['/goals']),
      error: () => this.goalFormComponent.enable(),
    });
  }
}
