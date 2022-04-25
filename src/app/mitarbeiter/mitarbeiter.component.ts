import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})
export class MitarbeiterComponent implements OnInit {
  topTitle = 'Mitarbeiter';
  midTitle = 'Gruppen';
  botTitle = 'Schichtplan';

  buttonTitleNewWorker = 'Neuer Mitarbeiter';
  buttonTitleGroup = 'Mitarbeiter in dieser Gruppe verwalten';
  buttonTitleWorker = 'Neuer Mitarbeiter';

  constructor() { }

  ngOnInit(): void {
  }

}
