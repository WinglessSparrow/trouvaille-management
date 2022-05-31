import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';
import { ShowQRComponent } from './show-qr/show-qr.component';

@NgModule({
  declarations: [
  
    ShowQRComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LieferungenModule { }
