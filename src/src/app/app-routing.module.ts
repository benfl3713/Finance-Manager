import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { DemoGuard } from './Guards/demo.guard';
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
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { GoalsComponent } from './Pages/goals/goals.component';
import { AddGoalComponent } from './Pages/goals/add-goal/add-goal.component';
import { EditGoalComponent } from './Pages/goals/edit-goal/edit-goal.component';
import { AddSplitTransactionComponent } from './Pages/add/add-split-transaction/add-split-transaction.component';
import { AddTransferTransactionComponent } from './Pages/add/add-transfer-transaction/add-transfer-transaction.component';
import { SettingsComponent } from './Pages/settings/settings.component';

const authorisedRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: { title: 'Accounts' },
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'Transactions' },
  },
  {
    path: 'accounts/:id',
    component: AccountDetailsComponent,
  },
  {
    path: 'accounts/:id/external-account',
    component: AccountDetailsExternalAccountsComponent,
    data: { title: 'External Accounts' },
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
      { path: 'transaction/split', component: AddSplitTransactionComponent },
      {
        path: 'transaction/transfer',
        component: AddTransferTransactionComponent,
      },
      {
        path: 'goal',
        component: AddGoalComponent,
        data: { title: 'Add Goal' },
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Settings' },
  },
  {
    path: 'datafeeds',
    loadChildren: () =>
      import('./Pages/datafeeds/datafeeds.module').then(
        (m) => m.DatafeedsModule
      ),
    data: { title: 'Datafeeds' },
  },
  {
    path: 'goals',
    component: GoalsComponent,
    data: { title: 'Goals' },
  },
  {
    path: 'goals/:id',
    component: EditGoalComponent,
    data: { title: 'Edit Goal' },
  },
  {
    path: 'wealth',
    loadChildren: () =>
      import('./Modules/wealth/wealth.module').then((m) => m.WealthModule),
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
  { path: 'register', component: RegisterComponent, canActivate: [DemoGuard] },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
