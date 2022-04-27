import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LieferungenFormComponent } from './lieferungen-form/lieferungen-form.component';

@NgModule({
  declarations: [
    LieferungenFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LieferungenModule { }
