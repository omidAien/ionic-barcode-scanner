import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { ProductInfoViewerComponent } from './product-info-viewer/product-info-viewer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PreloaderComponent, ProductInfoViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[
    PreloaderComponent,
    ProductInfoViewerComponent
  ]
})
export class SharedModule { }
