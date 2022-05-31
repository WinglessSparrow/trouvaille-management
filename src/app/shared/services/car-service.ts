import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { GlobalResponse } from "../models/global-response";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

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
}
