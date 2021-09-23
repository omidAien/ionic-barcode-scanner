import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductTrackerPageRoutingModule } from './product-tracker-routing.module';

import { ProductTrackerPage } from './product-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductTrackerPageRoutingModule
  ],
  declarations: [ProductTrackerPage],
})
export class ProductTrackerPageModule {}
