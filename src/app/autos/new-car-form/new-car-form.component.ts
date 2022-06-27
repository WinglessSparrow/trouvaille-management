import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from '../../shared/components/error-page/error-page.component';
import { Car } from '../../shared/models/car';
import { BackendError } from '../../shared/models/error-message';
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
      lastcheck: new FormControl(null, Validators.required),
      maxvolume: new FormControl(null, Validators.compose([Validators.required, Validators.min(1000000), Validators.max(5000000)])),
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
      var error: BackendError = { title: "Oops! etwas ist schiefgelaufen..", error: { warnings: ["Nicht alle Felder sind (korrekt) gefüllt.Füllen Sie alle Felder aus und überprüfen Sie die rot markierten Felder."], error: { error: "Error", message: "" } } }
      const modalRef = this.modalService.open(ErrorPageComponent, { centered: true });
      modalRef.componentInstance.error = error;
      return;
    }
    this.car.licenceplate = newCarForm.licenceplate;
    this.car.status = newCarForm.status;
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

    this.propsToRemove.forEach(element => {
      delete this.car[element];
    });

    var isCreated: boolean = await this.carService.createCar(this.car);
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
