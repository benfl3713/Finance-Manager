import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <div
      *ngIf="isLoading"
      fxLayout="row"
      fxLayoutAlign="space-around center"
      style="height:100%;"
    >
      <mat-spinner [diameter]="diameter"></mat-spinner>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() isLoading: boolean = true;
  @Input() diameter: number = 100;
}
