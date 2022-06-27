import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { listenerCount } from 'process';
import { WorkerFormComponent } from '../mitarbeiter/worker-form/worker-form.component';
import { SuccessPageComponent } from '../shared/components/success-page/success-page.component';
import { Car } from '../shared/models/car';
import { CarService } from '../shared/services/car-service';
import { CarFormComponent } from './car-form/car-form.component';
import { DriverHistoryComponent } from './driver-history/driver-history.component';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.scss']
})
export class AutosComponent implements OnInit {

  carService: CarService;
  carList: Car[];

  iconName = "lierferwagen";
  topTitle = 'Lieferwagen';
  buttonTitle = 'Neuer Lieferwagen';
  changedTimeformat = false;

  constructor(cService: CarService, private modalService: NgbModal) {
    this.carService = cService;

  }

  async refreshCars() {
    this.carList = await this.carService.getAllCars();
  }

  ngOnInit(): void {

  }

  deleteCarFromList(carid: number) {
    this.carList = this.carList.filter(car => car.idvehicle != carid);
  }

  addCarToList(car: Car | boolean) {
    if (!car) {
      return;
    } else if (car instanceof Car) {
      this.carList.push(car);
      this.modalService.open(SuccessPageComponent, { centered: true });
    }

  }
  showNewCarFormFunc(value) {
    if (value) {
      document.getElementById("carForm").setAttribute("style", "display:none");
      document.getElementById("newCarForm").setAttribute("style", "display:inline");

    } else {
      document.getElementById("carForm").setAttribute("style", "display:none");
      document.getElementById("newCarForm").setAttribute("style", "display:none");
    }
  }


  showDriverHistory(carid) {
    const modalRef = this.modalService.open(DriverHistoryComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.carid = carid;
  }


  async ngAfterViewInit(): Promise<void> {
    console.log("afterViewInit called")
    document.getElementById("carForm").setAttribute("style", "display:inline");
    document.getElementById("newCarForm").setAttribute("style", "display:none");
    document.getElementById("driverHistory").setAttribute("style", "display:none");
    this.carList = await this.carService.getAllCars();

    this.itemDetails(this.carList[0]);
  }

  @ViewChild(CarFormComponent) cfc: CarFormComponent;
  itemDetails(value: any) {
    document.getElementById("carForm").setAttribute("style", "display:inline");
    document.getElementById("newCarForm").setAttribute("style", "display:none");
    this.cfc.changeEntrys(value);
    console.log(this.carList);
  }
}
