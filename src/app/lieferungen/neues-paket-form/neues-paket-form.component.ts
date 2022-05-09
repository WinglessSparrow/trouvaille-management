import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-neues-paket-form',
  templateUrl: './neues-paket-form.component.html',
  styleUrls: ['./neues-paket-form.component.scss']
})
export class NeuesPaketFormComponent implements OnInit {
  @Output() showButton1Value = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  closeForm() {
    this.showButton1Value.emit(false);
  }

}
