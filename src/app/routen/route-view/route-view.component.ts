import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Route } from '../../shared/models/route';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss']
})
export class RouteViewComponent implements OnInit {
  private map: L.Map;
  private centroid: L.LatLngExpression = [48, 8];
  private waypoints: L.LatLng[] = [];
  private route: Route = new Route();



  constructor() { }

  ngOnInit(): void {
    this.route.idroute = -1;
  }

  public initMap(): void {
    this.waypoints = [];
    console.log("initmap called");
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: 'https://td.vvjm.dev/osrm/route/v1',
      }),
      waypoints: [],
      fitSelectedRoutes: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        extendToWaypoints: false,
        missingRouteTolerance: 0,
        styles: [{ color: '#0066ff' }],
      },
    });
  }

  public setNewRoute(route: Route): void {
    if (this.route.idroute == route.idroute) {
      this.map.flyTo(this.centroid);
      return;
    };
    this.route = route;

    this.map.invalidateSize();

    this.centroid = [route.nodes[0].latitude, route.nodes[0].longitude];

    route.nodes.forEach(node => {
      var marker = L.marker([node.latitude, node.longitude], { draggable: false }).addTo(this.map);
      marker.dragging.disable;
      this.waypoints.push(new L.LatLng(node.latitude, node.longitude));
    });

    L.Routing.control({
      waypoints: this.waypoints,
    }).addTo(this.map);

    this.map.flyTo(this.centroid);
  }
}
