import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LieferungenComponent } from '../lieferungen.component';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.scss']
})
export class QrFormComponent implements OnInit {
  @Output() showButton2Value = new EventEmitter<boolean>(false);
  @Output() itemEvent = new EventEmitter<String>();
  @Output() qrSend = new EventEmitter<String>();
  constructor() { }

  ngOnInit(): void {
  }
  closeForm() {
    this.showButton2Value.emit(false);
  }


  itemDetailsStringEvent() {
    this.itemEvent.emit('manualTracking');
  }

  sendQRToForm($event) {
    console.log("QR CODE?", $event)
    this.qrSend.emit($event);
  }
}
