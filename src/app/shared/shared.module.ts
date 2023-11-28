import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BurgermenuComponent } from './burgermenu/burgermenu.component';

@NgModule({
  declarations: [BurgermenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [BurgermenuComponent]
})
export class SharedModule { }