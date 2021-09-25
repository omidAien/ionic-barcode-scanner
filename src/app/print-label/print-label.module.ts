import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintLabelPageRoutingModule } from './print-label-routing.module';

import { PrintLabelPage } from './print-label.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PrintLabelPageRoutingModule
  ],
  declarations: [PrintLabelPage]
})
export class PrintLabelPageModule {}
