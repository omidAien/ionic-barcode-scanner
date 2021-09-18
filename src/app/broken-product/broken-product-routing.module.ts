import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrokenProductPage } from './broken-product.page';

const routes: Routes = [
  {
    path: '',
    component: BrokenProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrokenProductPageRoutingModule {}
