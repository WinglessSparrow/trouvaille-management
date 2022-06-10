import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(cService: CarService, private modalService: NgbModal) {
    console.log("Car constructor")
    this.carService = cService;
    this.carList = this.carService.getAllCars();
    console.log("cars", this.carList)
  }

  ngOnInit(): void {
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
    const modalRef = this.modalService.open(DriverHistoryComponent, { centered: true });
    modalRef.componentInstance.carid = carid;
    //document.getElementById("carForm").setAttribute("style", "display:none");
    //document.getElementById("newCarForm").setAttribute("style", "display:none");
    //document.getElementById("driverHistory").setAttribute("style", "display:inline");
  }


  ngAfterViewInit(): void {
    document.getElementById("carForm").setAttribute("style", "display:none");
    document.getElementById("newCarForm").setAttribute("style", "display:none");
    document.getElementById("driverHistory").setAttribute("style", "display:none");
  }

  @ViewChild(CarFormComponent) cfc: CarFormComponent;
  itemDetails(value: any) {
    document.getElementById("carForm").setAttribute("style", "display:inline");
    document.getElementById("newCarForm").setAttribute("style", "display:none");
    this.cfc.changeEntrys(value);
  }




}
