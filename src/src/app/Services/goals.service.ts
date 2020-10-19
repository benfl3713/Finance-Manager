import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceApiRequest } from './finance-api.request.service';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private financeApi: FinanceApiRequest) {}

  addGoal(goal: any): Observable<any> {
    return this.financeApi.post('goal', JSON.stringify(goal));
  }

  getGoals(): Observable<any> {
    return this.financeApi.get<any[]>('goals');
  }

  getGoalById(goalId: string) {
    return this.financeApi.get(`goal/${goalId}`);
  }

  deleteGoal(goalId: string) {
    return this.financeApi.delete(`goal/${goalId}`);
  }

  updateGoal(goal: any) {
    return this.financeApi.put('goal', JSON.stringify(goal));
  }
}
