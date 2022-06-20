import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery';
import { GlobalResponse } from "../models/global-response";
import { firstValueFrom } from 'rxjs';
import { HistoryEntry } from '../models/historyEntry';
import { BackendError } from '../models/error-message';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient, private modalService: NgbModal) { }

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

  public async createDelivery(delivery: Delivery) {
    await new Promise<GlobalResponse>(resolve => {
      this.http.post<GlobalResponse>("https://td.vvjm.dev/api/deliveries/order", delivery).subscribe(val => {
        resolve(val);
      })
    })
  }

  public async getOne(id: String) {
    const delivery: Delivery = await new Promise<Delivery>(resolve => {
      this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/" + id).subscribe(val => {
        resolve(val.data[0]);
      },
        error => {
          var errorMessage: BackendError = { title: "Oops! Etwas ist schief gelaufen..", error: { message: "message", warnings: ["Diese Lieferungen-ID existiert nicht."] } }
          const modalRef = this.modalService.open(ErrorPageComponent, { centered: true });
          modalRef.componentInstance.error = errorMessage;
        })
    })
    return delivery;
  }

  public async getDeliveryHistory(iddelivery: String) {
    var historyEntries = [] as HistoryEntry[];
    await new Promise<GlobalResponse>(resolve => {
      this.http.get<GlobalResponse>("https://td.vvjm.dev/api/deliveries/history/" + iddelivery).subscribe(val => {

        historyEntries = val.data[0];
        resolve(val);
      },
      )
    })
    return historyEntries;
  }

  public changeDeliveryState(packageid: number, state: string) {
    this.http.put<GlobalResponse>("https://td.vvjm.dev/api/deliveries/changeState/" + packageid, state).subscribe();

  }

}
