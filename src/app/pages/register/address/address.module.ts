import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { addressPageRoutingModule } from './address-routing.module';

import { addressPage } from './address.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, addressPageRoutingModule],
  declarations: [addressPage],
})
export class addressPageModule {}
