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
  showLieferungenForm: boolean = true;

  showScannerFunc(value) {
    this.showScanner = value;
    if (value == true) {
      this.showLieferungenForm = false;
      this.showNeuesPaketForm = false;
    } else {
      this.showLieferungenForm = true;
      this.showNeuesPaketForm = false;
    }

  }
  showNeuesPaketFormFunc(value) {
    this.showNeuesPaketForm = value;
    if (value == true) {
      this.showScanner = false;
      this.showLieferungenForm = false;
    } else {
      this.showScanner = false;
      this.showLieferungenForm = true;
    }

  }
  showLieferungenFunc(value) {
    this.showLieferungenForm = value;
    if (value == true) {
      this.showScanner = false;
      this.showNeuesPaketForm = false;
    } else {
      this.showScanner = true;
      this.showNeuesPaketForm = true;
    }

  }



  constructor() { }

  ngOnInit(): void {
  }

}
