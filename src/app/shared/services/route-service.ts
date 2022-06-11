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
}