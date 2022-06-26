import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessPageComponent } from '../../../shared/components/success-page/success-page.component';
import { DayShiftEntry, WeekShiftEntry } from '../../../shared/models/shift';
import { SchedulerService } from '../../../shared/services/scheduler-service';

@Component({
  selector: 'app-route-changer',
  templateUrl: './route-changer.component.html',
  styleUrls: ['./route-changer.component.scss']
})
export class RouteChangerComponent implements OnInit {

  @Input() dayShiftEntryWithRoute: DayShiftEntry[];
  @Input() dstWeekShiftEntry: WeekShiftEntry;
  @Input() workingWeeks : string[] = [];

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  routeChangeForm: FormGroup;
  selectedRoute: number;
  selectedDay: string;

  schedulerService : SchedulerService


  constructor(sService: SchedulerService, private modalService: NgbModal) { 
    this.schedulerService = sService;
  }

  ngOnInit(): void {
    this.routeChangeForm = new FormGroup({
      routeSelect: new FormControl(this.dayShiftEntryWithRoute[0]),
      daySelect: new FormControl(this.workingWeeks[0]),
    });
  }
  
  getDay(day) : string {
    switch (day) {
      case "Montag":
        return "monday";
      case "Dienstag":
        return "tuesday";
      case "Mittwoch":
        return "wednesday";
      case "Donnerstag":
        return "thursday";
      case "Freitag":
        return "friday";
      case "Samstag":
        return "saturday";
    }
  }

  changeRoute(routeChangeForm) {
    var src = (routeChangeForm.routeSelect as DayShiftEntry).shiftWorkingTimeId
    var dst = (this.dstWeekShiftEntry[this.getDay(routeChangeForm.daySelect)] as DayShiftEntry).shiftWorkingTimeId;

    this.schedulerService.changeRoute(src, dst).subscribe(() => { 
      const modalRef = this.modalService.open(SuccessPageComponent, { centered: true });
      modalRef.componentInstance.message = "Die Route wurde erfolgreich getauscht.";
    });
    this.notifyParent.emit();
  }

  cancle() {
    this.notifyParent.emit();
  }
}
