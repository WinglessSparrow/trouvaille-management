import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalResponse } from "../models/global-response";
import { Route } from "../models/route";

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    constructor(private http: HttpClient) {
    }

    public getAllRoutes() {
        var routes = [] as Route[];
        this.http.get<GlobalResponse>("https://td.vvjm.dev/api/routes/" + 0 + "/" + 2147483647).subscribe(data => {
            data.data[0].forEach(element => {
                element as Route;
                element.text = "Route-ID: " + element.idroute;
                routes.push(element);
            });
        });
        return routes;
    }

    public getRouteCount(): number {
        var routeCount = 0;
        this.http.get<GlobalResponse>("https://td.vvjm.dev/api/routes/count", {}).subscribe(data => {
            routeCount = data.data[0];
        })
        return routeCount;
    }

    public async getRouteCountAsync() {
        var to: number = 0;
        await new Promise<GlobalResponse>(resolve => {
          this.http.get<GlobalResponse>("https://td.vvjm.dev/api/routes/count").subscribe(val => {
    
            to = val.data[0];
            resolve(val);
          },
          )
        })
        return to;
      }
}