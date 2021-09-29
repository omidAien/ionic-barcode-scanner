import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrokenProductPageRoutingModule } from './broken-product-routing.module';

import { BrokenProductPage } from './broken-product.page';
import { SharedModule } from '../shared/shared.module';
import { BrokrnRegisterComponent } from './modalPages/brokrn-register/brokrn-register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    BrokenProductPageRoutingModule,
  ],
  declarations: [BrokenProductPage, BrokrnRegisterComponent],
  entryComponents:[
    BrokrnRegisterComponent
  ]
})
export class BrokenProductPageModule {}
