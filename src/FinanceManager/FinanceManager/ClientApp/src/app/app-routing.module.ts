import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { NavigationComponent } from './Navigation/navigation.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AccountsComponent } from './Pages/accounts/accounts.component';
import { TransactionsComponent } from './Pages/transactions/transactions.component';
import { AccountDetailsComponent } from './Pages/account-details/account-details.component';
import { TransactionDetailsComponent } from './Pages/transaction-details/transaction-details.component';

const authorisedRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'account/:id',
    component: AccountDetailsComponent,
  },
  {
    path: 'transaction/:id',
    component: TransactionDetailsComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: authorisedRoutes,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
