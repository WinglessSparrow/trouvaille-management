import { Component, Input, OnInit } from '@angular/core';
import { ListviewComponent } from '../shared/components/listview/listview.component';

@Component({
  selector: 'app-lieferungen',
  templateUrl: './lieferungen.component.html',
  styleUrls: ['./lieferungen.component.scss']
})
export class LieferungenComponent implements OnInit {
  iconName = "lieferungen";
  lieferungenList = [
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },
    {
      text: "Paket text",
    },

  ]
  topTitle = 'Lieferungen';
  buttonTitle = 'Neues Paket';
  buttonTitle2 = 'Paket scannen';

  showScanner: boolean = false;
  showNeuesPaketForm: boolean = false;

  showScannerFunc(value) {
    this.showScanner = value;
  }
  showNeuesPaketFormFunc(value) {
    this.showNeuesPaketForm = value;
  }



  constructor() { }

  ngOnInit(): void {
  }

}
