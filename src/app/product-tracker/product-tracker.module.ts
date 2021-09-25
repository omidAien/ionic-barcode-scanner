import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductTrackerPageRoutingModule } from './product-tracker-routing.module';

import { ProductTrackerPage } from './product-tracker.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProductTrackerPageRoutingModule
  ],
  declarations: [ProductTrackerPage],
})
export class ProductTrackerPageModule {}
