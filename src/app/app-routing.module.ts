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
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-tracker',
    loadChildren: () => import('./product-tracker/product-tracker.module').then( m => m.ProductTrackerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'broken-product',
    loadChildren: () => import('./broken-product/broken-product.module').then( m => m.BrokenProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'print-label',
    loadChildren: () => import('./print-label/print-label.module').then( m => m.PrintLabelPageModule),
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
