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

interface DayShiftEntry {
    status: ShiftWorkingTimeStatusType;
    routeIdRoute: number;
    shift: ShiftType;
}

interface WeekShiftEntry {
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
    entries: Array<WeekShiftEntry>;
}