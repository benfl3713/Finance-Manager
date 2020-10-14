import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BalanceHistoryChartComponent } from './widgets/balance-history-chart/balance-history-chart.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SpentPerCategoryChartComponent } from './widgets/spent-per-category-chart/spent-per-category-chart.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    TransactionFormComponent,
    BalanceHistoryChartComponent,
    LoadingSpinnerComponent,
    SpentPerCategoryChartComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
  ],
  providers: [DatePipe, CurrencyPipe],
  exports: [
    TransactionFormComponent,
    BalanceHistoryChartComponent,
    LoadingSpinnerComponent,
    SpentPerCategoryChartComponent,
    ErrorPageComponent,
  ],
})
export class ComponentModule {}
