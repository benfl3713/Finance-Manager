import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalFormComponent } from 'src/app/Components/goal-form/goal-form.component';
import { GoalsService } from 'src/app/Services/goals.service';

@Component({
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css'],
})
export class EditGoalComponent implements OnInit, AfterViewInit {
  constructor(
    private goalService: GoalsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild(GoalFormComponent, { static: false })
  private goalFormComponent: GoalFormComponent;

  id: string;
  goalNotFound = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    Promise.resolve(() => this.goalFormComponent.disable()).then(() => {
      this.goalService.getGoalById(this.id).subscribe({
        next: (transaction) => {
          if (transaction) {
            this.goalFormComponent.setFormValues(transaction);
            this.goalFormComponent.enable();
          } else {
            this.goalNotFound = true;
          }
        },
        error: () => (this.goalNotFound = true),
      });
    });
  }

  save(form) {
    const goal = {
      Id: this.id,
      Date: form.value.date,
      AccountId: form.value.account.AccountId,
      GoalAmount: form.value.amount,
      Name: form.value.name,
    };

    this.goalService.updateGoal(goal).subscribe({
      next: () => this.router.navigate(['/goals']),
      error: () => this.goalFormComponent.enable(),
    });
  }
}
