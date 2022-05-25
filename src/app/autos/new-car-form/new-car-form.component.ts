import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../../shared/models/car';
import { CarService } from '../../shared/services/car-service';

@Component({
  selector: 'app-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.scss']
})
export class NewCarFormComponent implements OnInit {
  car: Car;
  newCarForm: FormGroup;
  carService: CarService;

  @Output() showButton1Value = new EventEmitter<boolean>(false);

  constructor(cService: CarService) {
    this.carService = cService;
    this.car = new Car();

    this.newCarForm = new FormGroup({
      nextcheck: new FormControl(),
      licenceplate: new FormControl(),
      status: new FormControl(),
      isdeleted: new FormControl(),
      maxvolume: new FormControl(),
      lastcheck: new FormControl(),
    });
  }

  propsToRemove = [
    "text",
    "idvehicle",
  ]

  closeForm() {
    this.showButton1Value.emit(false);
  }

  public createCar(newCarForm): void {
    this.car.licenceplate = newCarForm.licenceplate;
    this.car.status = newCarForm.status;
    this.car.isdeleted = newCarForm.isdeleted;
    this.car.maxvolume = parseInt(newCarForm.maxvolume);
    //TODO: Fix car date, get form date, also do this for deliveries
    this.car.lastcheck = "2022-05-23T16:25:38.223Z";
    this.car.nextcheck = "2022-05-23T16:25:38.223Z";
    this.car.isdeleted = false;

    this.propsToRemove.forEach(element => {
      delete this.car[element];
    });

    this.carService.createCar(this.car);
    console.log(this.car);
  }

  ngOnInit(): void {
  }

}
