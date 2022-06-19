export enum ShiftType{
    FIRST = "first",
    SECOND = "second"
}

export enum ShiftWorkingTimeStatusType{
    STANDBY = "standby",
    UNAVAILABLE = "unavailable",
    ACTIVE = "active",
    WORKING = "working"
}

export interface DayShiftEntry {
    status: ShiftWorkingTimeStatusType;
    routeIdRoute: number;
    shift: ShiftType;
}

export interface WeekShiftEntry {
    employeeId: number;
    monday : DayShiftEntry;
    tuesday : DayShiftEntry;
    wednesday : DayShiftEntry;
    thursday : DayShiftEntry;
    friday : DayShiftEntry;
    saturday : DayShiftEntry;
}

export interface WeekShift {
    year: number;
    calenderWeek: number;
    entries: WeekShiftEntry[];
}


  // tag und id nicht ändern
  /// INFOS
  //status nie null
  //falls status.working darf shift nicht null sein
  //routeIDroute nicht ändern