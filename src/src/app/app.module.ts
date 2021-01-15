import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  DEFAULT_CURRENCY_CODE,
  APP_INITIALIZER,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IsLoadingModule } from '@service-work/is-loading';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './Components/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './Navigation/navigation.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ServiceModule } from './Services/service.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterComponent } from './Pages/register/register.component';
import { AccountsComponent } from './Pages/accounts/accounts.component';
import { TransactionsComponent } from './Pages/transactions/transactions.component';
import { AccountDetailsComponent } from './Pages/account-details/account-details.component';
import { FinanceApiRequest } from './Services/finance-api.request.service';
import {
  TransactionDetailsComponent,
  TransactionSetCustomIcon,
} from './Pages/transaction-details/transaction-details.component';
import { DatePipe } from '@angular/common';
import { ComponentModule } from './Components/component.module';
import { AddAccountComponent } from './Pages/add/add-account/add-account.component';
import { AddTransactionComponent } from './Pages/add/add-transaction/add-transaction.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PipesModule } from './Pipes/pipes.module';
import { AccountDetailsExternalAccountsComponent } from './Pages/account-details/account-details-external-accounts/account-details-external-accounts.component';
import { GoalsComponent } from './Pages/goals/goals.component';
import { AddGoalComponent } from './Pages/goals/add-goal/add-goal.component';
import { EditGoalComponent } from './Pages/goals/edit-goal/edit-goal.component';
import { AddSplitTransactionComponent } from './Pages/add/add-split-transaction/add-split-transaction.component';
import { AddTransferTransactionComponent } from './Pages/add/add-transfer-transaction/add-transfer-transaction.component';
import { SettingsComponent } from './Pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AccountsComponent,
    TransactionsComponent,
    AccountDetailsComponent,
    TransactionDetailsComponent,
    AddAccountComponent,
    AddTransactionComponent,
    AccountDetailsExternalAccountsComponent,
    GoalsComponent,
    AddGoalComponent,
    EditGoalComponent,
    AddSplitTransactionComponent,
    AddTransferTransactionComponent,
    TransactionSetCustomIcon,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    HttpClientModule,
    FlexLayoutModule,
    ComponentModule,
    IsLoadingModule,
    PipesModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
          distance: 40,
        },
      },
      behaviour: {
        autoHide: 3500,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' },
    {
      provide: APP_INITIALIZER,
      useFactory: FinanceApiRequest.LoadBaseUrl,
      deps: [HttpClient],
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
