import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Delivery } from '../shared/models/delivery';
import { DeliveryService } from '../shared/services/delivery-service';
import { LieferungenFormComponent } from './lieferungen-form/lieferungen-form.component';

@Component({
  selector: 'app-lieferungen',
  templateUrl: './lieferungen.component.html',
  styleUrls: ['./lieferungen.component.scss']
})
export class LieferungenComponent implements OnInit {
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
    this.lieferungenList = this.deliveryService.getAllDeliveries();
  }

  showScannerFunc(value) {
    this.showScanner = value;
    if (value == true) {
      this.showLieferungenForm = false;
      this.showNeuesPaketForm = false;
    } else {
      this.showLieferungenForm = true;
      this.showNeuesPaketForm = false;
    }

  }
  showNeuesPaketFormFunc(value) {
    this.showNeuesPaketForm = value;
    if (value == true) {
      this.showScanner = false;
      this.showLieferungenForm = false;
    } else {
      this.showScanner = false;
      this.showLieferungenForm = true;
    }

  }
  showLieferungenFunc(value) {
    this.showLieferungenForm = value;
    if (value == true) {
      this.showScanner = false;
      this.showNeuesPaketForm = false;
    } else {
      this.showScanner = true;
      this.showNeuesPaketForm = true;
    }

  }

  ngOnInit(): void {
  }

  @ViewChild(LieferungenFormComponent) lfc: LieferungenFormComponent;
  itemDetails(value: any) {
    document.getElementById("lieferungenForm").removeAttribute("hidden");
    this.lfc.changeEntrys(value);
  }

}
