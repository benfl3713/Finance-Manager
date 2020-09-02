import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [TransactionFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [DatePipe],
  exports: [TransactionFormComponent],
})
export class ComponentModule {}
