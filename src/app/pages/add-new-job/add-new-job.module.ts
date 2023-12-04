import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewJobPageRoutingModule } from './add-new-job-routing.module';

import { AddNewJobPage } from './add-new-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewJobPageRoutingModule
  ],
  declarations: [AddNewJobPage]
})
export class AddNewJobPageModule {}
