import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})
export class MitarbeiterComponent implements OnInit {
  currentRate = 8;
  constructor() { }

  ngOnInit(): void {
  }

}
