import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NamePicturePage } from './name-picture.page';

const routes: Routes = [
  {
    path: '',
    component: NamePicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamePicturePageRoutingModule {}
