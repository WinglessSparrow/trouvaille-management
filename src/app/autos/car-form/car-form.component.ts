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


  public changeEntrys(c: Car) {
    this.car = c;
    console.log("changeEntries: ", this.car);
  }

}
