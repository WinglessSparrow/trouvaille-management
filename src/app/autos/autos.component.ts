import { Component, OnInit } from '@angular/core';
import { Delivery } from '../shared/models/delivery';
import { DeliveryService } from '../shared/services/delivery-service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.scss']
})
export class AutosComponent implements OnInit {

  iconName = "lieferungen";
  lieferungenList: Delivery[];

  topTitle = 'Lieferungen';

  buttonTitle = 'Neues Paket';
  buttonTitle2 = 'Paket scannen';

  showScanner: boolean = false;
  showNeuesPaketForm: boolean = false;
  showLieferungenForm: boolean = true;

  deliveryService: DeliveryService;

  constructor(dService: DeliveryService) {
    this.deliveryService = dService;
  }

  ngOnInit(): void {
  }

}
