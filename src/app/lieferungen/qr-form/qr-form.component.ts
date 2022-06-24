import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ScannerComponent } from '../../shared/components/scanner/scanner.component';
import { LieferungenComponent } from '../lieferungen.component';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.scss']
})
export class QrFormComponent implements OnInit, OnDestroy {
  @Output() closeQrForm = new EventEmitter<boolean>(false);
  @Output() itemEvent = new EventEmitter<String>();
  @Output() qrSend = new EventEmitter<String>();
  @ViewChild(ScannerComponent) sc: ScannerComponent;
  constructor() { }

  ngOnInit(): void {
  }
  closeForm() {
    this.closeQrForm.emit(false);
  }
  ngOnDestroy(): void {
    // TODO: stop scan does nothing
    this.sc.stopScan();

  }


  itemDetailsStringEvent() {
    this.itemEvent.emit('manualTracking');
  }

  sendQRToForm($event) {
    this.qrSend.emit($event);
  }
}
