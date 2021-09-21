import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintLabelPage } from './print-label.page';

const routes: Routes = [
  {
    path: '',
    component: PrintLabelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintLabelPageRoutingModule {}
