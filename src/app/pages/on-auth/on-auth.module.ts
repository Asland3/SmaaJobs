import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnAuthPageRoutingModule } from './on-auth-routing.module';

import { OnAuthPage } from './on-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnAuthPageRoutingModule
  ],
  declarations: [OnAuthPage]
})
export class OnAuthPageModule {}
