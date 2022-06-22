import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() carCreated = new EventEmitter<Car | boolean>();

  constructor(cService: CarService, private modalService: NgbModal) {
    this.carService = cService;
    this.car = new Car();

    this.newCarForm = new FormGroup({
      nextcheck: new FormControl(),
      licenceplate: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      isdeleted: new FormControl(),
      maxvolume: new FormControl(null, Validators.required),
      lastcheck: new FormControl(null, Validators.required),
    });
  }

  propsToRemove = [
    "text",
    "idvehicle",
  ]

  closeForm() {
    this.showButton1Value.emit(false);
  }

  public async createCar(newCarForm): Promise<void> {
    if (!this.areAllInputsValid()) {
      console.log("not all inputs valid!");
      this.modalService.open("Nicht alle Felder sind (korrekt) gefüllt.Füllen Sie alle Felder aus und überprüfen Sie die rot markierten Felder.", { centered: true });
      return;
    }
    this.car.licenceplate = newCarForm.licenceplate;
    this.car.status = newCarForm.status;
    this.car.isdeleted = newCarForm.isdeleted;
    this.car.maxvolume = parseInt(newCarForm.maxvolume);
    var tempmonth = "";
    var tempday = "";
    if (newCarForm.lastcheck.month < 10) {
      tempmonth = "0" + newCarForm.lastcheck.month;
    } else {
      tempmonth = newCarForm.lastcheck.month;
    }
    if (newCarForm.lastcheck.day < 10) {
      tempday = "0" + newCarForm.lastcheck.day;
    } else {
      tempday = newCarForm.lastcheck.day;
    }

    var datebuilder: string = "";
    datebuilder = newCarForm.lastcheck.year + "-" + tempmonth + "-" + tempday + "T00:00:00.000Z";
    this.car.lastcheck = datebuilder;

    datebuilder = newCarForm.lastcheck.year + 2 + "-" + tempmonth + "-" + tempday + "T00:00:00.000Z";
    this.car.nextcheck = datebuilder;
    this.car.isdeleted = false;

    this.propsToRemove.forEach(element => {
      delete this.car[element];
    });

    var isCreated: boolean = await this.carService.createCar(this.car);
    console.log(isCreated);
    if (isCreated) {
      this.car.text = "Auto: " + this.car.licenceplate;
      this.carCreated.emit(this.car);
    }
    else {
      this.carCreated.emit(false);
    }


  }

  areAllInputsValid() {
    for (let el in this.newCarForm.controls) {
      if (this.newCarForm.controls[el].errors) {
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
  }

}
