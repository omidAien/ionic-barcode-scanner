import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { ProductInfoViewerComponent } from './product-info-viewer/product-info-viewer.component';



@NgModule({
  declarations: [PreloaderComponent, ProductInfoViewerComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PreloaderComponent,
    ProductInfoViewerComponent
  ]
})
export class SharedModule { }
