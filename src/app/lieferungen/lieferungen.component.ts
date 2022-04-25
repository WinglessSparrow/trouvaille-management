import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
