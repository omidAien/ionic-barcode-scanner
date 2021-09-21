import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintLabelPageRoutingModule } from './print-label-routing.module';

import { PrintLabelPage } from './print-label.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintLabelPageRoutingModule
  ],
  declarations: [PrintLabelPage]
})
export class PrintLabelPageModule {}
