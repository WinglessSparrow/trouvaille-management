import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from '../../shared/models/delivery';
import { DeliveryService } from '../../shared/services/delivery-service';

@Component({
  selector: 'app-neues-paket-form',
  templateUrl: './neues-paket-form.component.html',
  styleUrls: ['./neues-paket-form.component.scss']
})
export class NeuesPaketFormComponent implements OnInit {
  delivery: Delivery;
  newDeliveryForm: FormGroup;
  deliveryService: DeliveryService;
  @Output() createdDelivery = new EventEmitter<boolean>();
  showDatePicker: boolean = false;

  @Output() closeNewPackageForm = new EventEmitter<boolean>(false);
  constructor(dService: DeliveryService, private modalService: NgbModal) {
    this.deliveryService = dService;
    this.delivery = new Delivery();

    this.newDeliveryForm = new FormGroup({
      customerfirstname: new FormControl(null, Validators.required),
      customerlastname: new FormControl(null, Validators.required),
      customeremail: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      srcstreetname: new FormControl(null, Validators.required),
      srcstreetnumber: new FormControl(null, Validators.required),
      srczipcode: new FormControl(null, Validators.required),
      srccity: new FormControl(null, Validators.required),
      srccountry: new FormControl(null, Validators.required),
      dststreetname: new FormControl(null, Validators.required),
      dststreetnumber: new FormControl(null, Validators.required),
      dstzipcode: new FormControl(null, Validators.required),
      dstcity: new FormControl(null, Validators.required),
      dstCountry: new FormControl(null, Validators.required),
      depth: new FormControl(null, Validators.compose([Validators.required, Validators.min(10), Validators.max(120)])),
      width: new FormControl(null, Validators.compose([Validators.required, Validators.min(7), Validators.max(60)])),
      height: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), Validators.max(60)])),
      weight: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), Validators.max(31500)])),
      ispickup: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required),
      pickupDate: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  closeForm() {
    this.closeNewPackageForm.emit(false);
  }

  propsToRemove = [
    "text",
    "packageid",
    "iddelivery",
    "externTrackingnumber",
    "currentState",
    "weight",
    "height",
    "width",
    "depth",
    "dstAddress"
  ]

  public async createDelivery(newDeliveryForm) {
    if (!this.areAllInputsValid()) {
      console.log("not all inputs valid!");
      this.modalService.open("Nicht alle Felder sind (korrekt) gefüllt.Füllen Sie alle Felder aus und überprüfen Sie die rot markierten Felder.", { centered: true });
      return;
    }
    this.delivery.customer.firstname = newDeliveryForm.customerfirstname;
    this.delivery.customer.lastname = newDeliveryForm.customerlastname;
    this.delivery.customer.email = newDeliveryForm.customeremail;
    this.delivery.srcAddress.streetname = newDeliveryForm.srcstreetname;
    this.delivery.srcAddress.streetnumber = newDeliveryForm.srcstreetnumber;
    this.delivery.srcAddress.zipcode = newDeliveryForm.srczipcode;
    this.delivery.srcAddress.city = newDeliveryForm.srccity;
    this.delivery.srcAddress.country = newDeliveryForm.srccountry;
    this.delivery.destAddress.streetname = newDeliveryForm.dststreetname;
    this.delivery.destAddress.streetnumber = newDeliveryForm.dststreetnumber;
    this.delivery.destAddress.zipcode = newDeliveryForm.dstzipcode;
    this.delivery.destAddress.city = newDeliveryForm.dstcity;
    this.delivery.destAddress.country = newDeliveryForm.dstCountry;
    this.delivery.pack.depth = newDeliveryForm.depth;
    this.delivery.pack.width = newDeliveryForm.width;
    this.delivery.pack.height = newDeliveryForm.height;
    this.delivery.pack.weight = newDeliveryForm.weight;
    this.delivery.isPickup = newDeliveryForm.ispickup;
    this.delivery.paymentMethod = newDeliveryForm.payment;

    if (newDeliveryForm.isPickup === "true") {
      var datebuilder: string = "";
      var tempmonth = "";
      if (newDeliveryForm.pickupDate.month < 10) {
        tempmonth = "0" + newDeliveryForm.pickupDate.month;
      } else {
        tempmonth = newDeliveryForm.pickupDate.month;
      }
      datebuilder = newDeliveryForm.pickupDate.year + "-" + tempmonth + "-" + newDeliveryForm.pickupDate.day + "T00:00:00.000Z";
      this.delivery.pickupDate = datebuilder;
    }
    this.propsToRemove.forEach(element => {
      delete this.delivery[element];
    });
    if (newDeliveryForm.isPickup === "false") {
      delete this.delivery["pickupDate"];
    }
    await this.deliveryService.createDelivery(this.delivery);
    this.delivery.text = "Paket: "
    this.createdDelivery.emit(true);
  }

  setIsPickup(event: Event) {
    var isTrueSet = ((event.target as HTMLInputElement).value === 'true');
    this.showDatePicker = isTrueSet;
  }

  areAllInputsValid() {
    for (let el in this.newDeliveryForm.controls) {
      if (this.newDeliveryForm.controls[el].errors) {
        return false;
      }
    }
    return true;
  }

}
