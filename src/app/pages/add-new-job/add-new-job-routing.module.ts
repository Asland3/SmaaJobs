import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewJobPage } from './add-new-job.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewJobPageRoutingModule {}
