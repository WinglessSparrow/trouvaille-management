import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from '../../shared/models/delivery';
import { DeliveryService } from '../../shared/services/delivery-service';
import { ShowQRComponent } from '../show-qr/show-qr.component';
import QRCode from 'qrcode'
import { SuccessPageComponent } from '../../shared/components/success-page/success-page.component';

@Component({
  selector: 'app-lieferungen-form',
  templateUrl: './lieferungen-form.component.html',
  styleUrls: ['./lieferungen-form.component.scss']
})
export class LieferungenFormComponent implements OnInit {
  @Output() clickedHistoryEvent = new EventEmitter<string>();
  @Output() closedForm = new EventEmitter<boolean>(false);
  @Output() changedDeliveryStateRefresh = new EventEmitter<boolean>(false);
  delivery: Delivery;
  deliveryService: DeliveryService;
  deliveryForm: FormGroup;
  qrCode: string = undefined;

  constructor(dService: DeliveryService, private modalService: NgbModal) {
    this.deliveryService = dService;
    this.delivery = new Delivery();

    this.deliveryForm = new FormGroup({
      packageid: new FormControl(),
      iddelivery: new FormControl(),
      weight: new FormControl(),
      height: new FormControl(),
      width: new FormControl(),
      depth: new FormControl(),
      currentState: new FormControl(),
      isPickup: new FormControl(),
      pickupDate: new FormControl(),
      srcAddresszipcode: new FormControl(),
      srcAddressstreetname: new FormControl(),
      srcAddressstreetnumber: new FormControl(),
      srcAddresscity: new FormControl(),
      srcAddresscountry: new FormControl(),
      dstAddresszipcode: new FormControl(),
      dstAddressstreetname: new FormControl(),
      dstAddressstreetnumber: new FormControl(),
      dstAddresscity: new FormControl(),
      dstAddresscountry: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  public changeEntrys(d: Delivery) {
    this.delivery = d;
  }

  propsToRemove = [
    "group",
    "loginfailedcounter",
    "usersafetycode",
    "usersafetycodedate",
    "usersafetycodeexpiredate",
    "salt",
    "createdat",
    "lastpasswordresetat",
    "inactiveList",
    "text"
  ]

  packageHistoryEvent() {
    this.clickedHistoryEvent.emit(this.delivery.iddelivery);
  }

  async generateQR() {
    try {
      this.showModal(await QRCode.toDataURL(this.delivery.iddelivery, { "width": 400, }));
    } catch (err) {
      console.error(err)
    }
  }

  showModal(code: string) {
    const modalRef = this.modalService.open(ShowQRComponent, { centered: true });
    modalRef.componentInstance.code = code;
  }

  closeForm() {
    this.closedForm.emit(false);
  }

  async changeDeliveryState() {
    var newState = this.deliveryForm.controls.currentState.value;
    var success = await this.deliveryService.changeDeliveryState(this.delivery.iddelivery, newState);
    if (!success) {
      return;
    } else if (success) {
      this.modalService.open(SuccessPageComponent, { centered: true });
      this.changedDeliveryStateRefresh.emit(true);
      this.delivery.currentState = newState;
    }
  }
}
