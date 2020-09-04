import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatafeedsRoutingModule } from './datafeeds-routing.module';
import { DatafeedsComponent } from './datafeeds.component';


@NgModule({
  declarations: [DatafeedsComponent],
  imports: [
    CommonModule,
    DatafeedsRoutingModule
  ]
})
export class DatafeedsModule { }
