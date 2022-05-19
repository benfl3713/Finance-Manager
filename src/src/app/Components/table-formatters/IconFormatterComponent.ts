import { Component } from "@angular/core";

@Component({
  selector: 'app-image-formatter-cell',
  template: `<img [src]="params.value || 'assets/defaultTransaction.png'" class="transaction-logo" />` })

export class ImageFormatterComponent {
  params: any;
  agInit(params: any){
    this.params = params;
  }
}
