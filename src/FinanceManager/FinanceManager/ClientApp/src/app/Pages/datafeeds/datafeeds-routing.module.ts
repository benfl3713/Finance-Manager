import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatafeedsComponent } from './datafeeds.component';
import { DatafeedTruelayerComponent } from './datafeed-truelayer/datafeed-truelayer.component';

const routes: Routes = [
  { path: '', component: DatafeedsComponent },
  { path: 'truelayer', component: DatafeedTruelayerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatafeedsRoutingModule {}
