import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalResponse } from "../models/global-response";
import { Group } from "../models/group";

@Injectable()
export class GroupService {

    constructor(private http: HttpClient) {
    }

    public getAllGroups(): Group[] {
        var groups = [] as Group[];
        this.http.get<GlobalResponse>("https://td.vvjm.dev/api/v1/group", {}).subscribe(data => {
            data.data[0].forEach(element => {
                element as Group;
                element.text = element.groupname;
                groups.push(element);
            });
        });
        return groups;
    }
}
