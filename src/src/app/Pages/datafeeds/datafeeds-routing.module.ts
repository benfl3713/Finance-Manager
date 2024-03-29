import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatafeedsComponent } from './datafeeds.component';
import { DatafeedTruelayerComponent } from './datafeed-truelayer/datafeed-truelayer.component';
import { DemoGuard } from 'src/app/Guards/demo.guard';
import { DatafeedCoinbaseComponent } from './datafeed-coinbase/datafeed-coinbase.component';

const routes: Routes = [
  { path: '', component: DatafeedsComponent },
  {
    path: 'truelayer',
    component: DatafeedTruelayerComponent,
    canActivate: [DemoGuard],
  },
  {
    path: 'coinbase',
    component: DatafeedCoinbaseComponent,
    canActivate: [DemoGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatafeedsRoutingModule {}
