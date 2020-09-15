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
import { AddAccountComponent } from './Pages/add/add-account/add-account.component';
import { AddTransactionComponent } from './Pages/add/add-transaction/add-transaction.component';
import { AccountDetailsExternalAccountsComponent } from './Pages/account-details/account-details-external-accounts/account-details-external-accounts.component';

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
    path: 'accounts/:id',
    component: AccountDetailsComponent,
  },
  {
    path: 'accounts/:id/external-account',
    component: AccountDetailsExternalAccountsComponent,
  },
  {
    path: 'transactions/:id',
    component: TransactionDetailsComponent,
  },
  {
    path: 'add',
    children: [
      { path: 'account', component: AddAccountComponent },
      { path: 'transaction', component: AddTransactionComponent },
    ],
  },
  {
    path: 'datafeeds',
    loadChildren: () =>
      import('./Pages/datafeeds/datafeeds.module').then(
        (m) => m.DatafeedsModule
      ),
  },
];

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
