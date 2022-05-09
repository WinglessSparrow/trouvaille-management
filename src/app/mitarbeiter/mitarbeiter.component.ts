import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})
export class MitarbeiterComponent implements OnInit {
  toggleGroup = true;

  topTitle = 'Mitarbeiter';
  midTitle = 'Gruppen';
  botTitle = 'Schichtplan';

  buttonTitleNewWorker = 'Neuer Mitarbeiter';
  buttonTitleGroup = 'Mitarbeiter in dieser Gruppe verwalten';
  buttonTitleWorker = 'Neuer Mitarbeiter';

  iconMitarbeiter = "mitarbeiter";
  iconGroup = "group";

  workerList = [
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
    {
      text: "Max Mustermann"
    },
  ]

  groupList = [
    {
      text: "Gruppe 1"
    },
    {
      text: "Gruppe 2"
    },
    {
      text: "Gruppe 3"
    },
    {
      text: "Gruppe 4"
    },
    {
      text: "Gruppe 5"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
