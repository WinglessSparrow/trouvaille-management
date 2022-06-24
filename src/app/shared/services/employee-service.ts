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

    public async getEmployeIdList() {
        var idList: number[];
        const employees : Employee[] = await new Promise<Employee[]>(resolve => {
            this.http.post<GlobalResponse>("https://td.vvjm.dev/api/v1/employee/filter", {}).subscribe(val => {
            resolve(val.data[0]);
          })
        })
        employees.forEach(element => {
            idList.push(element.idemployee);
        });
        return idList;
    }

    public changeEmployee(employee: Employee): void {
        this.http.put<GlobalResponse>("https://td.vvjm.dev/api/v1/employee", employee)
            .subscribe();
    }

    public createEmployee(employee: Employee): void {
        this.http.post<GlobalResponse>("https://td.vvjm.dev/api/v1/employee", employee)
            .subscribe();
    }

    public async getOneEmployee(employeeId: Number) {
        const employee: Employee = await new Promise<Employee>(resolve => {
            this.http.post<GlobalResponse>("https://td.vvjm.dev/api/v1/employee/filter", { "idemployee": employeeId }).subscribe(val => {
                resolve(val.data[0][0]);
            })
        })
        return employee;
    }

    public deleteEmployee(employee: Employee): void {
        this.http.delete<GlobalResponse>("https://td.vvjm.dev/api/v1/employee/"+employee.idemployee)
            .subscribe();
    }
}