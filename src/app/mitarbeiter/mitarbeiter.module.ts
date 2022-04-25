import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WorkerFormComponent } from './worker-form/worker-form.component';

@NgModule({
  declarations: [
    WorkerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MitarbeiterModule { }
