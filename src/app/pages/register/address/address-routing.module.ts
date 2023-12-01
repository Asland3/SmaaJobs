import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { addressPage } from './address.page';

const routes: Routes = [
  {
    path: '',
    component: addressPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class addressPageRoutingModule {}
