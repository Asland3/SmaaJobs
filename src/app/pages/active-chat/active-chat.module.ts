import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveChatPageRoutingModule } from './active-chat-routing.module';

import { ActiveChatPage } from './active-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveChatPageRoutingModule
  ],
  declarations: [ActiveChatPage]
})
export class ActiveChatPageModule {}
