import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class StatsService {

    constructor(private http: HttpClient) {
    }
}
