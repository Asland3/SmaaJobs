import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamePicturePageRoutingModule } from './name-picture-routing.module';

import { NamePicturePage } from './name-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NamePicturePageRoutingModule
  ],
  declarations: [NamePicturePage]
})
export class NamePicturePageModule {}
