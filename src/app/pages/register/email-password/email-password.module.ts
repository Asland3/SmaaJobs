import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPasswordPageRoutingModule } from './email-password-routing.module';

import { EmailPasswordPage } from './email-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailPasswordPageRoutingModule
  ],
  declarations: [EmailPasswordPage]
})
export class EmailPasswordPageModule {}
