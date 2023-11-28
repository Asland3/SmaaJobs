import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BurgermenuComponent } from './burgermenu.component';

const routes: Routes = [
  {
    path: '',
    component: BurgermenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BurgermenuComponentRoutingModule {}
