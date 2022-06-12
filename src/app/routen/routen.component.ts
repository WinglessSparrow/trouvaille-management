import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '../shared/models/route';
import { RouteService } from '../shared/services/route-service';
import { RouteViewComponent } from './route-view/route-view.component';

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
  @ViewChild(RouteViewComponent) rvc: RouteViewComponent

  constructor(rService: RouteService) {
    this.routeService = rService;
    this.routeList = this.routeService.getAllRoutes();
    console.log("routeList: ", this.routeList);
  }


  ngOnInit(): void {

  }


  itemDetails(route: Route) {
    document.getElementById("routeView").setAttribute("style", "display:inline");
    this.rvc.setNewRoute(route);
  }
  ngAfterViewInit(): void {
    this.rvc.initMap();
    document.getElementById("routeView").setAttribute("style", "display:none");
  }

}
