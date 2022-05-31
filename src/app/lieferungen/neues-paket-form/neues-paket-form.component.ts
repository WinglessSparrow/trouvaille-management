import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Delivery } from '../../shared/models/delivery';
import { Employee } from '../../shared/models/employee';
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
  @Input() lieferungenList: Delivery[];

  @Output() showButton1Value = new EventEmitter<boolean>(false);
  constructor(dService: DeliveryService) {
    this.deliveryService = dService;
    this.delivery = new Delivery();

    this.newDeliveryForm = new FormGroup({
      customerfirstname: new FormControl(),
      customerlastname: new FormControl(),
      customeremail: new FormControl(),
      srcstreetname: new FormControl(),
      srcstreetnumber: new FormControl(),
      srczipcode: new FormControl(),
      srccity: new FormControl(),
      srccountry: new FormControl(),
      dststreetname: new FormControl(),
      dststreetnumber: new FormControl(),
      dstzipcode: new FormControl(),
      dstcity: new FormControl(),
      dstCountry: new FormControl(),
      depth: new FormControl(),
      width: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      ispickup: new FormControl(),
      payment: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  closeForm() {
    this.showButton1Value.emit(false);
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

  public createDelivery(newDeliveryForm): void {
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
    this.delivery.pickupDate = new Date().toJSON().slice(0, 10).replace(/-/g, '.');

    this.propsToRemove.forEach(element => {
      delete this.delivery[element];
    });

    if (!newDeliveryForm.isPickup) {
      delete this.delivery["pickupDate"];
    }


    this.deliveryService.createDelivery(this.delivery);
    //TODO: Geht mmn nicht ohne watchquery, da weder iddelivery noch packageid zu diesem punkt vorhanden  
    this.lieferungenList.push(this.delivery);
    console.log(this.delivery);
  }

}
