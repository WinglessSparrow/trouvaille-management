import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { CarService } from '../../shared/services/car-service';

@Component({
  selector: 'app-driver-history',
  templateUrl: './driver-history.component.html',
  styleUrls: ['./driver-history.component.scss']
})
export class DriverHistoryComponent implements OnInit {
  @Input() carid: Number;
  driverHistoryList: Employee[] = [];
  carService: CarService;
  iconname = "mitarbeiter"

  constructor(cService: CarService) {
    this.carService = cService;
  }

  public async getDriverHistory(carid: Number) {
    this.driverHistoryList = await this.carService.getDriverHistory(carid);
    this.driverHistoryList = [...this.driverHistoryList]
    console.log("drivers: ", this.driverHistoryList);
  }

  ngOnInit() {
    this.getDriverHistory(this.carid);
  }

}
