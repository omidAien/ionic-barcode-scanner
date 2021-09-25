import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrokenProductPageRoutingModule } from './broken-product-routing.module';

import { BrokenProductPage } from './broken-product.page';
import { ProductTrackerPage } from '../product-tracker/product-tracker.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BrokenProductPageRoutingModule,
  ],
  declarations: [BrokenProductPage]
})
export class BrokenProductPageModule {}
