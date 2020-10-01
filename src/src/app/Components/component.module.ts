import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BalanceHistoryChartComponent } from './widgets/balance-history-chart/balance-history-chart.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SpentPerCategoryChartComponent } from './widgets/spent-per-category-chart/spent-per-category-chart.component';

@NgModule({
  declarations: [
    TransactionFormComponent,
    BalanceHistoryChartComponent,
    LoadingSpinnerComponent,
    SpentPerCategoryChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [DatePipe],
  exports: [
    TransactionFormComponent,
    BalanceHistoryChartComponent,
    LoadingSpinnerComponent,
    SpentPerCategoryChartComponent,
  ],
})
export class ComponentModule {}
