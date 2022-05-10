import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.scss']
})
export class QrFormComponent implements OnInit {
  @Output() showButton2Value = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }
  closeForm() {
    this.showButton2Value.emit(false);
  }

}
