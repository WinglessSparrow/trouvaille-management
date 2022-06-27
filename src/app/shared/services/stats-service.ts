import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalResponse } from "../models/global-response";

@Injectable()
export class StatsService {

    constructor(private http: HttpClient) {
    }


}
