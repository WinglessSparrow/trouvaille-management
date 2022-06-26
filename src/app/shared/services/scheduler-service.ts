import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { resolve } from "path";
import { Observable } from "rxjs";
import { Employee } from "../models/employee";
import { GlobalResponse } from "../models/global-response";
import { WeekShift } from "../models/shift";
import { EmployeeService } from "./employee-service";

class ShiftFilter{
    year: number;
    calenderWeek: number;
    employeeIdList: number[];
    constructor(y: number, cw: number, eIdL: number[]) {
        this.year = y;
        this.calenderWeek = cw;
        this.employeeIdList = eIdL;
    }
}

class cRoute{
    srcShiftWorkingTimeId: number;
    dstShiftWorkingTimeId: number;
    constructor(s: number, d: number) {
        this.srcShiftWorkingTimeId = s;
        this.dstShiftWorkingTimeId = d;
    }
}

@Injectable()
export class SchedulerService {
    idList: number[];

    constructor(private http: HttpClient, private employeeService: EmployeeService) {
    }

    public async getWeekShiftAsync(y: number, cw: number) {
        var idList: number[] = [];
        var weekShift: WeekShift;
        var employees = await new Promise<Employee[]>(resolve => {
            this.http.post<GlobalResponse>("https://td.vvjm.dev/api/v1/employee/filter", {})
                .subscribe(val => resolve(val.data[0]))
        });

        employees.forEach(element => {
            if(element.group.groupname.toLocaleLowerCase() === "driver")
            idList.push(element.idemployee);
        });

        let shiftFilter = new ShiftFilter(y, cw, idList);
        await new Promise<GlobalResponse>(resolve => {
            this.http.post<GlobalResponse>("https://td.vvjm.dev/api/shift/filter", shiftFilter)
                .subscribe(val => {
                    weekShift = val.data[0];
                    resolve(val);
                });
        })

        employees.forEach(employee => {
            weekShift.entries.forEach(entry => {
                if (employee.idemployee == entry.employeeId) {
                    entry.firstname = employee.firstname;
                    entry.lastname = employee.lastname;
                }
            });
        });
        return weekShift;
    }

    public getWeekShift(y: number, cw: number, eIdList: number[]): WeekShift{
        let weekShift: WeekShift;
        let shiftFilter = new ShiftFilter(y, cw, eIdList);
        this.http.post<GlobalResponse>("https://td.vvjm.dev/api/shift/filter", shiftFilter).subscribe(val => {
            weekShift = val.data[0];
            resolve(val.data[0])
        });
        return weekShift;
    }

    public setWeekShift(weekShift: WeekShift): void {
        this.http.post<GlobalResponse>("https://td.vvjm.dev/api/shift", weekShift)
            .subscribe();
    }

    public changeRoute(src: number, dst: number): Observable<GlobalResponse> {
        var c = new cRoute(src, dst);
        return this.http.post<GlobalResponse>("https://td.vvjm.dev/api/shift/changeRoute", c);
    }
}
