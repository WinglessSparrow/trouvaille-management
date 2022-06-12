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
  }

  public setNewRoute(route: Route): void {
    console.log("setNewRoute with Route: ", route);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    route.nodes.forEach(node => {
      var marker = L.marker([node.latitude, node.longitude]).addTo(this.map);
    })

    // create 5 random jitteries and add them to map
    const jittery = Array(5).fill(this.centroid).map(
      x => [x[0] + (Math.random() - .5) / 10, x[1] + (Math.random() - .5) / 10]
    ).map(
      x => L.marker(x as L.LatLngExpression)
    ).forEach(
      x => x.addTo(this.map)
    );
    tiles.addTo(this.map);
  }
}
