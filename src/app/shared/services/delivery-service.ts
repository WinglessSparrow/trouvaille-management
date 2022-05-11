import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery';
import { GlobalResponse } from "../models/global-response";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  public getDeliveriesCount(): number {
    var deliveriesCount = 0;
    this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/count", {}).subscribe(data => {
      deliveriesCount = data.data[0];
    })
    return deliveriesCount;
  }

  public getDeliveries(from: number, to: number) {
    var deliveries = [] as Delivery[];
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/deliveries/" + from + "/" + to, {}).subscribe(data => {
      data.data[0].forEach(element => {
        element as Delivery;
        element.text = "Paket: " + element.trackingNumber;
        deliveries.push(element);
      });
    });
    return deliveries;
  }

  public getAllDeliveries() {
    var deliveries = [] as Delivery[];
    var countAll: number = this.getDeliveriesCount()
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/deliveries/0/" + countAll, {}).subscribe(data => {
      data.data[0].forEach(element => {
        element as Delivery;
        element.text = "Paket: " + element.trackingNumber;
        deliveries.push(element);
      });
    });
    return deliveries;
  }

}
