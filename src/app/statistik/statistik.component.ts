import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employee-service';
import { DeliveryService } from '../shared/services/delivery-service';
import { Delivery } from '../shared/models/delivery';
import { CarService } from '../shared/services/car-service';
import { Car } from '../shared/models/car';
import { RouteService } from '../shared/services/route-service';
import { Route } from '../shared/models/route';
import { StatsService } from '../shared/services/stats-service';
import { AuthService } from '../shared/services/auth-service';

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
  statsService: StatsService;

  employeeList: Employee[];
  deliveryList: Delivery[];
  routeList: Route[];

  turnover: number;
  carCount: number;
  routeCount: number;

  constructor(eService: EmployeeService, dService: DeliveryService, cService: CarService, rService: RouteService, aService : AuthService) {
    this.employeeService = eService;
    this.deliveryService = dService;
    this.carService = cService;
    this.routeService = rService;
    this.employeeList = this.employeeService.getAllEmployees();
    this.routeList = this.routeService.getAllRoutes();
    this.deliveryList = this.deliveryService.getAllDeliveriesStatistik();
    this.getToAsync();
    this.getCarCount();
    this.getRouteCount();
  }

  async getToAsync(){
    this.turnover = await this.deliveryService.getTurnoverAsync();
  }

  async getCarCount() {
    this.carCount = await this.carService.getCarsCountAsync();
  }

  async getRouteCount() {
    this.routeCount = await this.routeService.getRouteCountAsync();
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

}
