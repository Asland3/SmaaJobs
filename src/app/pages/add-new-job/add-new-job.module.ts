import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewJobPageRoutingModule } from './add-new-job-routing.module';

import { AddNewJobPage } from './add-new-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewJobPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddNewJobPage]
})
export class AddNewJobPageModule {}
