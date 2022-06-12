import { Component, OnInit } from '@angular/core';
import { WeekShift, ShiftType, ShiftWorkingTimeStatusType } from '../../shared/models/shift';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss']
})
export class SchedulerFormComponent implements OnInit {
  selectedYear: number = 0;
  selectedWeek: number = 0;

  shifts: WeekShift[] = [
    {
      "year": 2022,
      "calenderWeek": 1,
      "entries": [
        {
          "employeeId": 1,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
        },
        {
          "employeeId": 2,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
        },
        {
          "employeeId": 12,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 4,
            "shift":ShiftType.SECOND
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 4,
            "shift":ShiftType.SECOND
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 4,
            "shift":ShiftType.SECOND
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 4,
            "shift":ShiftType.SECOND
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 4,
            "shift":ShiftType.SECOND
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute" : 4,
            "shift":ShiftType.SECOND
          },
        },
        {
          "employeeId": 4,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 4,
            "shift":ShiftType.FIRST
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 4,
            "shift":ShiftType.FIRST
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 4,
            "shift":ShiftType.FIRST
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 4,
            "shift":ShiftType.FIRST
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute" : 4,
            "shift":ShiftType.FIRST
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute" : 4,
            "shift":ShiftType.FIRST
          },
        },
        {
          "employeeId": 9,
          "monday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 6,
            "shift":ShiftType.FIRST
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 6,
            "shift":ShiftType.FIRST
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute": 6,
            "shift":ShiftType.FIRST
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute": 6,
            "shift":ShiftType.FIRST
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 6,
            "shift":ShiftType.FIRST
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 6,
            "shift":ShiftType.FIRST
          },
        },
        {
          "employeeId": 6,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 6,
            "shift":ShiftType.SECOND
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 6,
            "shift":ShiftType.SECOND
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 6,
            "shift":ShiftType.SECOND
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 6,
            "shift":ShiftType.SECOND
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 6,
            "shift":ShiftType.SECOND
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute" : 6,
            "shift":ShiftType.SECOND
          },
        },
      ]
    },
    {
      "year": 2021,
      "calenderWeek": 1,
      "entries": [
        {
          "employeeId": 3,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
        },
        {
          "employeeId": 4,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
        },
      ]
    },
    {
      "year": 2022,
      "calenderWeek": 2,
      "entries": [
        {
          "employeeId": 6,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
        },
        {
          "employeeId": 5,
          "monday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "tuesday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "wednesday": {
            "status": ShiftWorkingTimeStatusType.ACTIVE,
            "routeIdRoute": 1,
            "shift":ShiftType.SECOND
          },
          "thursday": {
            "status": ShiftWorkingTimeStatusType.STANDBY,
            "routeIdRoute": 1,
            "shift":ShiftType.FIRST
          },
          "friday": {
            "status": ShiftWorkingTimeStatusType.WORKING,
            "routeIdRoute" : 1,
            "shift":ShiftType.SECOND
          },
          "saturday": {
            "status": ShiftWorkingTimeStatusType.UNAVAILABLE,
            "routeIdRoute" : 1,
            "shift":ShiftType.FIRST
          },
        },
      ]
    },
  ];

  currentWeekShift: WeekShift = this.shifts[0];

  years: number[] = [];
  calenderWeeks: number[] = [];

  ngOnInit(): void {
    // set default year
    if (this.shifts.length > 0) {
      this.selectedYear = this.shifts[0].year;
      this.selectedWeek = this.shifts[0].calenderWeek;
      
      //select years
      this.shifts.forEach(element => {
        if (!this.years.includes(element.year)){
          this.years.push(element.year);
        }
      });

      this.onChange(this.selectedYear);
    }
    this.changeWeek();
  }

  //changes list of cw
  onChange(year: number) {
    this.selectedYear = year;

    this.calenderWeeks.length = 0;
    this.shifts.forEach(element => {
      if (element.year == this.selectedYear) {
        if (!this.calenderWeeks.includes(element.calenderWeek)){
          this.calenderWeeks.push(element.calenderWeek);
        }
      }
    });
  }

  onChangeWeek(week: number) {
    this.selectedWeek = week;
  }

  changeWeek() {
    this.shifts.forEach(element => {
      if (element.calenderWeek == this.selectedWeek && element.year == this.selectedYear) {
        this.currentWeekShift = element;
      }
    });
  }
}
