import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { NotifierService } from 'angular-notifier';
import { tap } from 'rxjs/operators';
import { GoalsService } from 'src/app/Services/goals.service';

@Component({
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  constructor(
    private goalsService: GoalsService,
    private router: Router,
    private notifier: NotifierService,
    private loadingService: IsLoadingService
  ) {}

  goals$ = this.goalsService
    .getGoals()
    .pipe(tap(() => this.loadingService.remove({ key: ['default', 'goals'] })));

  ngOnInit(): void {
    this.loadingService.add({ key: ['default', 'goals'] });
  }

  deleteGoal(goalId: string) {
    if (confirm('Are you sure you want to delete this goal')) {
      this.goalsService.deleteGoal(goalId).subscribe(() => {
        this.notifier.notify('success', 'Goal Delete Successfully');
        this.goals$ = this.goalsService.getGoals();
      });
    }
  }
}
