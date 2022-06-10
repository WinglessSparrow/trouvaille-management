import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverHistoryComponent } from '../../autos/driver-history/driver-history.component';
import { Car } from '../models/car';
import { Employee } from '../models/employee';
import { GlobalResponse } from "../models/global-response";
import { TempDriverEntry } from '../models/tempdriverentry';
import { EmployeeService } from './employee-service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  employeeService: EmployeeService;

  constructor(private http: HttpClient, eService: EmployeeService) {
    this.employeeService = eService;
  }

  public getCarsCount(): number {
    var carsCount = 0;
    this.http.get<GlobalResponse>("https://td.vvjm.dev/api/vehicle/count", {}).subscribe(data => {
      carsCount = data.data[0];
    })
    return carsCount;
  }

  public getCars(from: number, to: number) {
    var deliveries = [] as Car[];
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/" + from + "/" + to, {}).subscribe(data => {
      data.data[0].forEach(element => {
        element as Car;
        element.text = "Auto: " + element.trackingNumber;
        deliveries.push(element);
      });
    });
    return deliveries;
  }

  public getAllCars() {
    var cars = [] as Car[];
    var countAll = 2147483647;
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/0/" + countAll, {}).subscribe(data => {
      data.data[0].forEach(element => {
        element as Car;
        element.text = "Auto: " + element.licenceplate;
        cars.push(element);
      });
    });
    return cars;
  }

  public createCar(car: Car): void {
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/", car)
      .subscribe();
  }

  public async getDriverHistory(carid: Number) {
    var tempDriver = await new Promise<TempDriverEntry[]>(resolve => {
      this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/driverHistory/" + carid, {})
        .subscribe(val => resolve(val.data[0]))
    });
    console.log("tempDriver: ", tempDriver);
    return Promise.all(tempDriver.map(async v => {
      var driver: Employee = await this.employeeService.getOneEmployee(v.employeeId);
      driver.text = driver.firstname + " " + driver.lastname;
      return driver;
    }));
  }
}
