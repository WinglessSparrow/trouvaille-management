import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  employee: Employee;
  employeeForm: FormGroup;

  constructor(cService: CarService) {
    this.carService = cService;
    this.employee = new Employee();
    this.employeeForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phonenumber: new FormControl(),
      targetweeklyworkinghours: new FormControl(),
      passwordNew: new FormControl(),
      passwordAgain: new FormControl(),
      employeeStatus: new FormControl(),
      birthday: new FormControl()
    });
  }

  public changeEntrys(e: Employee) {
    this.employee = e;
  }

  public async getDriverHistory(carid: Number) {
    this.driverHistoryList = await this.carService.getDriverHistory(carid);
    this.driverHistoryList = [...this.driverHistoryList]
  }

  ngOnInit() {
    if (this.carid) this.getDriverHistory(this.carid);
    console.log("test log: ", this.driverHistoryList);
  }

}
