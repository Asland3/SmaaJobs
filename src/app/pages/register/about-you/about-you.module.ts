import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutYouPageRoutingModule } from './about-you-routing.module';

import { AboutYouPage } from './about-you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutYouPageRoutingModule
  ],
  declarations: [AboutYouPage]
})
export class AboutYouPageModule {}
