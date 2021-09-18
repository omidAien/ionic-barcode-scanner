import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrokenProductPageRoutingModule } from './broken-product-routing.module';

import { BrokenProductPage } from './broken-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrokenProductPageRoutingModule
  ],
  declarations: [BrokenProductPage]
})
export class BrokenProductPageModule {}
