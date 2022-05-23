import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery';
import { GlobalResponse } from "../models/global-response";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  public async getDeliveriesCount(): Promise<number> {
    var deliveriesCount;
    const data = await firstValueFrom(this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/count", {}));
    deliveriesCount = data.data[0];
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
    var countAll = 2147483647;
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/deliveries/0/" + countAll, {}).subscribe(data => {
      data.data[0].forEach(element => {
        element as Delivery;
        element.text = "Paket: " + element.packageid;
        deliveries.push(element);
      });
    });
    return deliveries;
  }

  public createDelivery(delivery: Delivery): void {
    this.http.post<GlobalResponse>("https://td.vvjm.dev/api/deliveries/order", delivery)
      .subscribe();
  }

  public getOne1(id: String) {
    var delivery: Delivery;
    this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/" + id, {}).subscribe(data => {
      delivery = data.data[0];
      delivery.text = "Paket: " + delivery.packageid
    });
    return delivery;
  }

  public async getOne(id: String) {
    var delivery: Delivery;
    await new Promise<GlobalResponse>(resolve => {
      this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/" + id).subscribe(val => {
        resolve(val);
        delivery = val.data[0];
      })
    })
    console.log("del", delivery);
    return delivery;
  }

}
