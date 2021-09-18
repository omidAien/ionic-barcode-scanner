import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductTrackerPage } from './product-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: ProductTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTrackerPageRoutingModule {}
