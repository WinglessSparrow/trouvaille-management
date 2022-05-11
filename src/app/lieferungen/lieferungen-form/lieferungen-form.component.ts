import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../shared/models/delivery';
import { DeliveryService } from '../../shared/services/delivery-service';

@Component({
  selector: 'app-lieferungen-form',
  templateUrl: './lieferungen-form.component.html',
  styleUrls: ['./lieferungen-form.component.scss']
})
export class LieferungenFormComponent implements OnInit {
  delivery: Delivery;
  deliveryService: DeliveryService;

  constructor(dService: DeliveryService) {
    this.deliveryService = dService;
    this.delivery = new Delivery();
  }

  ngOnInit(): void {
  }

  public changeEntrys(d: Delivery) {
    this.delivery = d;
  }
}
