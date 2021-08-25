import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticatePageRoutingModule } from './authenticate-routing.module';

import { AuthenticatePage } from './authenticate.page';
import { SharedModule } from '../shared/shared.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule, 
    AuthenticatePageRoutingModule
  ],
  declarations: [AuthenticatePage],
})
export class AuthenticatePageModule {}
