import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveChatPage } from './active-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveChatPageRoutingModule {}
