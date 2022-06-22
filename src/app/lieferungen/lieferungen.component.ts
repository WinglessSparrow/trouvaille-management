import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from '../shared/components/error-page/error-page.component';
import { ScannerComponent } from '../shared/components/scanner/scanner.component';
import { Delivery } from '../shared/models/delivery';
import { BackendError } from '../shared/models/error-message';
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
  @ViewChild(LieferungenFormComponent) lfc: LieferungenFormComponent;

  topTitle = 'Lieferungen';

  buttonTitle = 'Neues Paket';
  buttonTitle2 = 'Paket scannen';

  deliveryService: DeliveryService;

  showForm: boolean = true;
  showNewForm: boolean = false;
  showScanForm: boolean = false;


  constructor(dService: DeliveryService, private modalService: NgbModal) {
    this.deliveryService = dService;

  }

  async refreshDeliveryList() {
    console.log("refreshing delivery list");
    this.lieferungenList = await this.deliveryService.getAllDeliveries();
  }


  openFirst(value) {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
    this.itemDetails(this.lieferungenList[0]);
  }
  showScannerFunc(value) {
    console.log("1.1")
    document.getElementById("qrForm").setAttribute("style", "display:inline");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    document.getElementById("lieferungenForm").setAttribute("style", "display:none");
  }

  showNeuesPaketFormFunc(value) {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:inline");
    document.getElementById("lieferungenForm").setAttribute("style", "display:none");
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
    var lieferung;
    await this.deliveryService.getOne($event).then(del => lieferung = del);
    this.itemDetails(lieferung);
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
  }

  ngOnInit(): void {
  }




  async ngAfterViewInit(): Promise<void> {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    this.lieferungenList = await this.deliveryService.getAllDeliveries();
    this.itemDetails(this.lieferungenList[0]);
  }

  itemDetails(value: any) {
    document.getElementById("qrForm").setAttribute("style", "display:none");
    document.getElementById("neuesPaketForm").setAttribute("style", "display:none");
    document.getElementById("lieferungenForm").setAttribute("style", "display:inline");
    this.lfc.changeEntrys(value);
  }

}
