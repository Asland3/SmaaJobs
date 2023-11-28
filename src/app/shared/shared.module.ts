import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BurgermenuComponent } from './burgermenu/burgermenu.component';
import { BurgermenuComponentRoutingModule } from './burgermenu/burgermenu-routing.module';

@NgModule({
  declarations: [BurgermenuComponent],
  imports: [CommonModule, IonicModule, 
    BurgermenuComponentRoutingModule],
  exports: [BurgermenuComponent]
})
export class SharedModule { }