import { Component, OnInit } from '@angular/core';
import { ShiftWorkingTimeStatusType, WeekShift } from '../../shared/models/shift';
import { SchedulerService } from '../../shared/services/scheduler-service';
import DateTime from 'luxon/src/datetime.js'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftFormComponent } from './shift-form/shift-form.component';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss']
})
export class SchedulerFormComponent implements OnInit {
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

  constructor(private schedulerService: SchedulerService, private sanitizer: DomSanitizer, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.selectedWeek = DateTime.now().weekNumber;
    this.selectedYear = DateTime.now().year;
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