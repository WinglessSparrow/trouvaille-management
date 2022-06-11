import { Component, OnInit } from '@angular/core';
import { RouteService } from '../shared/services/route-service';

@Component({
  selector: 'app-routen',
  templateUrl: './routen.component.html',
  styleUrls: ['./routen.component.scss']
})
export class RoutenComponent implements OnInit {
  iconName = "route";
  topTitle = 'Routen';
  routeService: RouteService;
  routeList = [];

  constructor(rService: RouteService) {
    this.routeService = rService;
    this.routeList = this.routeService.getAllRoutes();
    console.log("routeList: ", this.routeList);
  }

  ngOnInit(): void {
  }

}
