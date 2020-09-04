import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatafeedsComponent } from './datafeeds.component';

const routes: Routes = [{ path: '', component: DatafeedsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatafeedsRoutingModule { }
