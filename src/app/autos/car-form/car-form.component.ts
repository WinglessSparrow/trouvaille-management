import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../../shared/models/car';
import { CarService } from '../../shared/services/car-service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  car: Car;
  carService: CarService;
  carForm: FormGroup;
  @Output() showButton1Value = new EventEmitter<boolean>(false);
  @Output() showDriverHistory = new EventEmitter<Number>(false);

  constructor(cService: CarService) {
    this.carService = cService;
    this.car = new Car();

    this.carForm = new FormGroup({
      idvehicle: new FormControl(),
      nextcheck: new FormControl(),
      licenceplate: new FormControl(),
      status: new FormControl(),
      isdeleted: new FormControl(),
      maxvolume: new FormControl(),
      lastcheck: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  closeForm() {
    this.showButton1Value.emit(false);
  }

  showHistoryEvent() {
    this.showDriverHistory.emit(this.car.idvehicle);
  }

  deactivateCar() {
    this.carService.deactivateCar(this.car.idvehicle);
  }

  saveCar() {
    for (let [key, value] of Object.entries(this.carForm)) {
      for (let [keyOld] of Object.entries(this.car)) {
        if (key === keyOld) {
          if (value !== null) {
            this.car[key] = value;
          }
        }
      }
    }
    this.car.status = (document.getElementById("status") as HTMLInputElement).value
    var isdeleted = ((document.getElementById("isdeleted") as HTMLInputElement).value === 'true');
    var tempmonth = "";
    var tempday = ""
    if (this.carForm.controls.lastcheck.value.month < 10) {
      tempmonth = "0" + this.carForm.controls.lastcheck.value.month;
    } else {
      tempmonth = this.carForm.controls.lastcheck.value.month;
    }
    if (this.carForm.controls.lastcheck.value.day < 10) {
      tempday = "0" + this.carForm.controls.lastcheck.value.day;
    } else {
      tempday = this.carForm.controls.lastcheck.value.day;
    }
    var datebuilder: string = "";
    datebuilder = this.carForm.controls.lastcheck.value.year + "-" + tempmonth + "-" + tempday + "T00:00:00.000Z";
    this.car.lastcheck = datebuilder;
    datebuilder = this.carForm.controls.lastcheck.value.year + 2 + "-" + tempmonth + "-" + tempday + "T00:00:00.000Z";
    this.car.nextcheck = datebuilder;
    this.car.isdeleted = isdeleted;
    this.car.maxvolume = parseInt((document.getElementById("maxvolume") as HTMLInputElement).value);
    this.carService.changeCar(this.car);
    this.car.licenceplate = (document.getElementById("licenceplate") as HTMLInputElement).value
    //TODO: IsDeleted not showing in car form
  }


  public changeEntrys(c: Car) {
    this.car = c;
  }

}
