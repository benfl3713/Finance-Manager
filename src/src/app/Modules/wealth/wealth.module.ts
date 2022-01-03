import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WealthRoutingModule } from './wealth-routing.module';
import { WealthPortfolioComponent } from './Pages/wealth-portfolio/wealth-portfolio.component';
import { WealthAssetsComponent } from './Pages/wealth-assets/wealth-assets.component';
import { WealthTradesComponent } from './Pages/wealth-trades/wealth-trades.component';
import { ComponentModule } from 'src/app/Components/component.module';
import { MaterialModule } from 'src/app/Components/material.module';


@NgModule({
  declarations: [WealthPortfolioComponent, WealthAssetsComponent, WealthTradesComponent],
  imports: [
    CommonModule,
    WealthRoutingModule,
    ComponentModule,
    MaterialModule
  ]
})
export class WealthModule { }
