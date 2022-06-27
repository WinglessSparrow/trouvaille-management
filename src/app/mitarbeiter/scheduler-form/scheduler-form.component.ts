import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SchedulerService } from '../../shared/services/scheduler-service';
import DateTime from 'luxon/src/datetime.js'
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ShiftFormComponent } from './shift-form/shift-form.component';
import { DayShiftEntry, ShiftWorkingTimeStatusType, WeekShift, WeekShiftEntry } from '../../shared/models/shift';
import { SuccessPageComponent } from '../../shared/components/success-page/success-page.component';
import { ErrPageComponent } from '../../shared/components/err-page/err-page.component';
import { RouteChangerComponent } from './route-changer/route-changer.component';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss']
})
export class SchedulerFormComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  shiftFormModalRef: NgbModalRef;
  
  /// INFOS
  //status nie null
  //falls status.working darf shift nicht null sein
  //routeIDroute nicht ändern
  weekShift: WeekShift = {
    year : 0,
    calenderWeek : 0,
    entries : []
  };
  
  selectedYear: number = 0;
  selectedWeek: number = 0; //max 52

  transfer: boolean;

  srcWeekShiftEntry: WeekShiftEntry;
  dstWeekShiftEntry: WeekShiftEntry;

  dayShiftEntryWithRoute: DayShiftEntry[] = [];

  constructor(private schedulerService: SchedulerService, private sanitizer: DomSanitizer, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.selectedWeek = DateTime.now().weekNumber;
    this.selectedYear = DateTime.now().year;
    this.getWeekShift(this.selectedYear, this.selectedWeek);
    this.transfer = false;
  }

  //activate changeRoute
  changeRoute(i: number) {
    this.srcWeekShiftEntry = this.weekShift.entries[i];

    var noRoute = true;
    //check if any dayShiftEntry has a route
    if (this.srcWeekShiftEntry.monday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.monday);
      noRoute = false;
    } if (this.srcWeekShiftEntry.tuesday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.tuesday);
      noRoute = false;
    } if (this.srcWeekShiftEntry.wednesday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.wednesday);
      noRoute = false;
    } if (this.srcWeekShiftEntry.thursday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.thursday);
      noRoute = false;
    } if (this.srcWeekShiftEntry.friday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.friday);
      noRoute = false;
    } if (this.srcWeekShiftEntry.saturday.routeIdRoute) {
      this.dayShiftEntryWithRoute.push(this.srcWeekShiftEntry.saturday);
      noRoute = false;
    } if(noRoute) {
      const modalRef = this.modalService.open(ErrPageComponent, { centered: true });
      modalRef.componentInstance.errorTitle = "Keine Route gefunden!"
      modalRef.componentInstance.errorMsg = "In der gewählten Wochenschicht, befindet sich keine aktive Route.";
      return;
    }

    this.transfer = true;
    const modalRef = this.modalService.open(SuccessPageComponent, { centered: true });
    modalRef.componentInstance.message = "Bitte eine Zeile auswählen mit der eine Route gewechselt werden soll.";
  }

  rowClick(i: number) {
    if (this.transfer) {
      this.dstWeekShiftEntry = this.weekShift.entries[i];
      var wArr = this.employeeWorkingWeeks(this.dstWeekShiftEntry);
      if (wArr.length > 0) {
        //CHANGE ROUTE
        const modalRef = this.modalService.open(RouteChangerComponent, { centered: true });
        modalRef.componentInstance.dayShiftEntryWithRoute = this.dayShiftEntryWithRoute;
        modalRef.componentInstance.dstWeekShiftEntry = this.dstWeekShiftEntry;
        modalRef.componentInstance.workingWeeks = wArr;
        modalRef.componentInstance["notifyParent"].subscribe(event => {
          this.refresh();
          modalRef.close();
          modalRef.dismiss();
         });
        this.transfer = false;
        this.dayShiftEntryWithRoute = [];
      } else {
        //ERROR EMPLOYEE NO WORKING SHIFT
        const modalRef = this.modalService.open(ErrPageComponent, { centered: true });
        modalRef.componentInstance.errorTitle = "Arbeitet nicht!"
        modalRef.componentInstance.errorMsg = "Der ausgewählte Mitarbeiter arbeitet in keiner Schicht! Bitte eine Schicht 'arbeitend' setzen und nochmals versuchen.";
      }
    }
  }

  employeeWorkingWeeks(entry: WeekShiftEntry) : string[] {
    var workingWeeks: string[] = [];
    if (entry.monday.status.valueOf() == "WORKING") {
      workingWeeks.push("Montag");
    } if (entry.tuesday.status.valueOf() === "WORKING") {
      workingWeeks.push("Dienstag");
    } if (entry.wednesday.status.valueOf() == "WORKING") {
      workingWeeks.push("Mittwoch");
    } if (entry.thursday.status.valueOf() == "WORKING") {
      workingWeeks.push("Donnerstag");
    } if (entry.friday.status.valueOf() == "WORKING") {
      workingWeeks.push("Freitag");
    } if (entry.saturday.status.valueOf() == "WORKING") {
      workingWeeks.push("Samstag");
    } 
    return workingWeeks;
  }

  refresh() {
    this.getWeekShift(this.selectedYear, this.selectedWeek);
  }

  public async getWeekShift(y: number, cw: number) {
    this.weekShift = await this.schedulerService.getWeekShiftAsync(y, cw);
  }

  // tag und id nicht ändern
  changeEntry(index: number) {
    const modalRef = this.modalService.open(ShiftFormComponent, { centered: true });
    modalRef.componentInstance.weekShiftEntry = this.weekShift.entries[index];
    modalRef.componentInstance.weekShift = this.weekShift;
    modalRef.componentInstance.shiftEntryIndex = index;
    modalRef.componentInstance["notifyParent"].subscribe(event => {
      modalRef.close();
     });
  }

  increaseWeek() {
    if (this.selectedWeek == 52) {
      this.selectedWeek = 1;
      this.selectedYear++;
    } else {
      this.selectedWeek++;
    }
    this.getWeekShift(this.selectedYear, this.selectedWeek);
  }

  decreaseWeek() {
    if (this.selectedWeek == 1) {
      this.selectedWeek = 52;
      this.selectedYear--;
    } else {
      this.selectedWeek--;
    }
    this.getWeekShift(this.selectedYear, this.selectedWeek);
  }

  TimeStatusController(status: string) {
    let button: string;
    switch (status) {
      case "ACTIVE":
        button = "<button disabled type='button' class='btn btn-outline-success'>aktiv</button>"
        break;
      case "UNAVAILABLE":
        button = "<button disabled type='button' class='btn btn-outline-danger'>nicht verfügbar</button>"
        break;
      case "STANDBY":
        button = "<button disabled type='button' class='btn btn-outline-success text-black'>bereitschaft</button>"
        break;
      case "WORKING":
        button = "<button disabled type='button' class='btn btn-outline-primary'>arbeiten</button>"
        break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(button);
  }

  ShiftTypeController(status: string) {
    let button: string;
    switch (status) {
      case "FIRST":
        button = "<button disabled type='button' class='btn btn-outline-info text-black'>früh</button>"
        break;
      case "SECOND":
        button = "<button disabled type='button' class='btn btn-outline-dark'>spät</button>"
        break;
      default:
        button = "";
        break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(button);
  }

}