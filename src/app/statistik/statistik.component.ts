import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employee-service';
import { DeliveryService } from '../shared/services/delivery-service';
import { Delivery } from '../shared/models/delivery';
import { CarService } from '../shared/services/car-service';
import { Car } from '../shared/models/car';
import { RouteService } from '../shared/services/route-service';
import { Route } from '../shared/models/route';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.scss']
})
export class StatistikComponent {
  employeeService: EmployeeService;
  deliveryService: DeliveryService;
  carService: CarService;
  routeService: RouteService;

  employeeList: Employee[];
  deliveryList: Delivery[];
  carList: Car[];
  routeList: Route[];

  constructor(eService: EmployeeService, dService: DeliveryService, cService: CarService, rService: RouteService) {
    this.employeeService = eService;
    this.deliveryService = dService;
    this.carService = cService;
    this.routeService = rService;
    this.employeeList = this.employeeService.getAllEmployees();
    this.carList = this.carService.getAllCarsStatistik();
    this.routeList = this.routeService.getAllRoutes();
    this.deliveryList = this.deliveryService.getAllDeliveriesStatistik();
  }



  activeDriver(): number {
    var count = 0;
    this.employeeList.forEach(element => {
      if (element.group.groupname.toLocaleLowerCase() === "driver" &&
        !element.isdeleted) {
        count++;
      }
    });
    return count;
  }

  getDeliverieCountByState(state: string) {
    var count = 0;
    this.deliveryList.forEach(element => {
      if (element.currentState.toLocaleLowerCase() === state) {
        count++;
      }
    });
    return count;
  }

  getActiveCarCount() {
    var count = 0;
    this.carList.forEach(element => {
      if (element.status.toLocaleLowerCase() === "available") {
        count++;
      }
    });
    return count;
  }

  getRouteCount() {
    var count = 0;
    this.carList.forEach(element => {
      count++;
    });
    return count;
  }

}
