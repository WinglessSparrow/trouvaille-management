import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from '../shared/models/delivery';
import { DeliveryService } from '../shared/services/delivery-service';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';
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

  deliveryService: DeliveryService;

  constructor(dService: DeliveryService, private modalService: NgbModal) {
    this.deliveryService = dService;
    this.lieferungenList = this.deliveryService.getAllDeliveries();
  }


  showScannerFunc(value) {
    if (value) {
      document.getElementById("qrForm").setAttribute("style", "display:inline");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
      document.getElementById("lieferungenForm").setAttribute("style", "display:none");
    } else {
      document.getElementById("qrForm").setAttribute("style", "display:none");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
      document.getElementById("lieferungenForm").setAttribute("style", "display:none");
    }
  }

  showNeuesPaketFormFunc(value) {
    if (value) {
      document.getElementById("qrForm").setAttribute("style", "display:none");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:inline");
      document.getElementById("lieferungenForm").setAttribute("style", "display:none");
    } else {
      document.getElementById("qrForm").setAttribute("style", "display:none");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
      document.getElementById("lieferungenForm").setAttribute("style", "display:none");
    }

  }
  showLieferungenFunc(value) {
    if (value) {
      document.getElementById("qrForm").setAttribute("style", "display:none");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
      document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
    } else {
      document.getElementById("qrForm").setAttribute("style", "display:none");
      document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
      document.getElementById("lieferungenForm").setAttribute("style", "display:none");
    }

  }

  showHistoryForm(iddelivery) {
    const modalRef = this.modalService.open(DeliveryHistoryComponent, { centered: true });
    modalRef.componentInstance.iddelivery = iddelivery;
  }

  async itemDetailsStringEvent() {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    const trackingNumber = (<HTMLInputElement>document.getElementById("manualTrackingId")).value;
    const lieferung = await this.deliveryService.getOne(trackingNumber);
    this.itemDetails(lieferung);
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
  }

  async showFormByQR($event) {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    const lieferung = await this.deliveryService.getOne($event).then(del => console.log("del:", del));
    this.itemDetails(lieferung);
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    document.getElementById("lieferungenForm").setAttribute("style", "display:none");
  }
  @ViewChild(LieferungenFormComponent) lfc: LieferungenFormComponent;
  itemDetails(value: any) {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
    this.lfc.changeEntrys(value);
  }

}
