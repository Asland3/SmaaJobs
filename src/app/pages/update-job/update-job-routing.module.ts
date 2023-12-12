import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateJobPage } from './update-job.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateJobPageRoutingModule {}
