import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { GlobalResponse } from "../models/global-response";

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    public getAllEmployees(): Employee[] {
        var employees = [] as Employee[];
        this.http.post<GlobalResponse>("https://td.vvjm.dev/api/v1/employee/filter", {}).subscribe(data => {
            data.data[0].forEach(element => {
                element as Employee;
                element.text = element.firstname + " " + element.lastname;
                employees.push(element);
            });
        });
        return employees;
    }

    public changeEmployee(employee: Employee): void {
        this.http.put<GlobalResponse>("https://td.vvjm.dev/api/v1/employee", employee)
            .subscribe();
    }
}
