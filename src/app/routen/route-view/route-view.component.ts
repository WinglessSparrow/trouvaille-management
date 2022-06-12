import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Route } from '../../shared/models/route';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss']
})
export class RouteViewComponent implements OnInit {
  private map: L.Map;
  private centroid: L.LatLngExpression = [48, 8];

  constructor() { }

  ngOnInit(): void {
  }

  public initMap(): void {
    console.log("initmap called");
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 15
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

  }

  public setNewRoute(route: Route): void {
    this.map.invalidateSize();
    console.log("setNewRoute with Route: ", route);
    this.centroid = [route.nodes[0].latitude, route.nodes[0].longitude];

    route.nodes.forEach(node => {
      var marker = L.marker([node.latitude, node.longitude]).addTo(this.map);

    });
    this.map.flyTo(this.centroid);



  }
}
