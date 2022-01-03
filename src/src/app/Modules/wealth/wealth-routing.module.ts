import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WealthPortfolioComponent } from './Pages/wealth-portfolio/wealth-portfolio.component';
import { WealthAssetsComponent } from './Pages/wealth-assets/wealth-assets.component';
import { WealthTradesComponent } from './Pages/wealth-trades/wealth-trades.component';

const routes: Routes = [
  {
    path: 'portfolio',
    component: WealthPortfolioComponent,
    data: { title: 'Portfolio' },
  },
  {
    path: 'assets',
    component: WealthAssetsComponent,
    data: { title: 'Assets' },
  },
  {
    path: 'trades',
    component: WealthTradesComponent,
    data: { title: 'Trades' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WealthRoutingModule {}
