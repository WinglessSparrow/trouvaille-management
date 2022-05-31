import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';

@Component({
  selector: 'app-driver-history',
  templateUrl: './driver-history.component.html',
  styleUrls: ['./driver-history.component.scss']
})
export class DriverHistoryComponent implements OnInit {
  @Input() driverHistoryList: Employee[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
