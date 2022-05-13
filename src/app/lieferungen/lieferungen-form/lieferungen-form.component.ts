import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  deliveryForm: FormGroup;

  constructor(dService: DeliveryService) {
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
    console.log(this.delivery);
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

  public createDelivery(deliveryForm): void {
    for (let [key, value] of Object.entries(deliveryForm)) {
      for (let [keyOld] of Object.entries(this.delivery)) {
        this.propsToRemove.forEach(element => {
          delete this.delivery[element];
        });

        if (key === keyOld) {
          if (value !== null) {
            this.delivery[key] = value;
          }
        }
      }
    }

    console.log(this.delivery);


    //this.deliveryService.changeEmployee(this.employee);
    //this.employee.text = this.employee.firstname + " " + this.employee.lastname;
  }
}
