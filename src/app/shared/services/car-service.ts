import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolver } from 'dns';
import { resolve } from 'path';
import { CarFormComponent } from '../../autos/car-form/car-form.component';
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

  public async getCarsCountAsync() {
    var to: number = 0;
    await new Promise<GlobalResponse>(resolve => {
      this.http.get<GlobalResponse>("https://td.vvjm.dev/api/vehicle/count").subscribe(val => {

        to = val.data[0];
        resolve(val);
      },
      )
    })
    return to;
  }

  public async getAllCars() {
    var cars = [] as Car[];
    var countAll = 2147483647;
    await new Promise<GlobalResponse>(resolve => {
      this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/0/" + countAll, {}).subscribe(val => {
        cars = val.data[0];
        resolve(val);
      })
    });
    cars.forEach(element => {
      element as Car;
      element.text = "Auto: " + element.licenceplate;
      cars.push(element);
    })
    return cars;
  }

  public createCarWithoutError(car: Car): void {
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/", car)
      .subscribe();
  }

  public createCar1(car: Car): boolean {
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/", car)
      .subscribe(error => { return false });
    return true;
  }

  public async createCar(car: Car) {
    return new Promise<boolean>(resolve => {
      this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/", car).subscribe((data) => { resolve(true) }, error => { resolve(false) });
    })
  }

  public async getDriverHistory(carid: Number) {
    var tempDriver = await new Promise<TempDriverEntry[]>(resolve => {
      this.http.post<GlobalResponse>("https://td.vvjm.dev/api/vehicle/driverHistory/" + carid, {})
        .subscribe(val => resolve(val.data[0]))
    });
    return Promise.all(tempDriver.map(async v => {
      var driver: Employee = await this.employeeService.getOneEmployee(v.employeeId);
      driver.text = driver.firstname + " " + driver.lastname;
      return driver;
    }));
  }

  public deactivateCar(carid: number): void {
    this.http.delete<GlobalResponse>("https://td.vvjm.dev/api/vehicle/" + carid).subscribe(val => resolve(val.data[0]));
  }

  public changeCar(car: Car) {
    delete car.text;
    this.http.put<GlobalResponse>("https://td.vvjm.dev/api/vehicle/", car).subscribe();
  }

}
