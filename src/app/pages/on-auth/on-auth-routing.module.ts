import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnAuthPage } from './on-auth.page';

const routes: Routes = [
  {
    path: '',
    component: OnAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnAuthPageRoutingModule {}
