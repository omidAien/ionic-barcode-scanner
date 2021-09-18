import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { IsLoginGuard } from './services/is-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./authenticate/authenticate.module').then( m => m.AuthenticatePageModule),
    canActivate: [IsLoginGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'product-tracker',
    loadChildren: () => import('./product-tracker/product-tracker.module').then( m => m.ProductTrackerPageModule)
  },
  {
    path: 'broken-product',
    loadChildren: () => import('./broken-product/broken-product.module').then( m => m.BrokenProductPageModule)
  },
  {
    path: 'barcode',
    loadChildren: () => import('./barcode/barcode.module').then( m => m.BarcodePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
