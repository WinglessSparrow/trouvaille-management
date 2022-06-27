import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessPageComponent } from '../../../shared/components/success-page/success-page.component';
import { DayShiftEntry, ShiftWorkingTimeStatusType, WeekShift, WeekShiftEntry } from '../../../shared/models/shift';
import { SchedulerService } from '../../../shared/services/scheduler-service';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss']
})
  

export class ShiftFormComponent implements OnInit {

  @Input() weekShiftEntry: WeekShiftEntry;
  @Input() weekShift: WeekShift;
  @Input() shiftEntryIndex: number;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  status: ShiftWorkingTimeStatusType;
  dayShiftEntries: DayShiftEntry[];

  errorHidden: boolean = true;

  weeks : string[] = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ];

  shiftControlNames: string[] = [
    "MontagShiftControl",
    "DienstagShiftControl",
    "MittwochShiftControl",
    "DonnerstagShiftControl",
    "FreitagShiftControl",
    "SamstagShiftControl",
  ];

  statusControlNames: string[] = [
    "MontagStatusControl",
    "DienstagStatusControl",
    "MittwochStatusControl",
    "DonnerstagStatusControl",
    "FreitagStatusControl",
    "SamstagStatusControl",
  ];

  shiftForm: FormGroup;
  schedulerService: SchedulerService;
  constructor(sService: SchedulerService, private modalService: NgbModal) {
    this.schedulerService = sService;
  }

  ngOnInit(): void {
    this.dayShiftEntries = [];
    this.dayShiftEntries.push(this.weekShiftEntry.monday);
    this.dayShiftEntries.push(this.weekShiftEntry.tuesday);
    this.dayShiftEntries.push(this.weekShiftEntry.wednesday);
    this.dayShiftEntries.push(this.weekShiftEntry.thursday);
    this.dayShiftEntries.push(this.weekShiftEntry.friday);
    this.dayShiftEntries.push(this.weekShiftEntry.saturday);

    this.shiftForm = new FormGroup({
      MontagStatusControl : new FormControl(this.weekShiftEntry.monday.status),
      DienstagStatusControl : new FormControl(this.weekShiftEntry.tuesday.status),
      MittwochStatusControl : new FormControl(this.weekShiftEntry.wednesday.status),
      DonnerstagStatusControl : new FormControl(this.weekShiftEntry.thursday.status),
      FreitagStatusControl : new FormControl(this.weekShiftEntry.friday.status),
      SamstagStatusControl: new FormControl(this.weekShiftEntry.saturday.status),
      MontagShiftControl : new FormControl(this.weekShiftEntry.monday.shift),
      DienstagShiftControl : new FormControl(this.weekShiftEntry.tuesday.shift),
      MittwochShiftControl : new FormControl(this.weekShiftEntry.wednesday.shift),
      DonnerstagShiftControl : new FormControl(this.weekShiftEntry.thursday.shift),
      FreitagShiftControl : new FormControl(this.weekShiftEntry.friday.shift),
      SamstagShiftControl : new FormControl(this.weekShiftEntry.saturday.shift),
     });
  }

  showRouteId(id : number) : boolean{
    if (id >= 1) {
      return true;
    }
    return false;
  }

  selected(sControl: string, sData: string) {
    if (sControl == sData) {
      return true;
    }
    return false;
  }

  propsToRemove = [
    "firstname",
    "lastname",
    "groupname",
  ]

  changeShiftEntry() {
    //status
    this.weekShiftEntry.monday.status = this.shiftForm.controls.MontagStatusControl.value;
    this.weekShiftEntry.tuesday.status = this.shiftForm.controls.DienstagStatusControl.value;
    this.weekShiftEntry.wednesday.status = this.shiftForm.controls.MittwochStatusControl.value;
    this.weekShiftEntry.thursday.status = this.shiftForm.controls.DonnerstagStatusControl.value;
    this.weekShiftEntry.friday.status = this.shiftForm.controls.FreitagStatusControl.value;
    this.weekShiftEntry.saturday.status = this.shiftForm.controls.SamstagStatusControl.value;

    //shift
    this.weekShiftEntry.monday.shift = this.shiftForm.controls.MontagShiftControl.value;
    this.weekShiftEntry.tuesday.shift = this.shiftForm.controls.DienstagShiftControl.value;
    this.weekShiftEntry.wednesday.shift = this.shiftForm.controls.MittwochShiftControl.value;
    this.weekShiftEntry.thursday.shift = this.shiftForm.controls.DonnerstagShiftControl.value;
    this.weekShiftEntry.friday.shift = this.shiftForm.controls.FreitagShiftControl.value;
    this.weekShiftEntry.saturday.shift = this.shiftForm.controls.SamstagShiftControl.value;

    if ((this.shiftForm.controls.MontagStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.MontagShiftControl.value != 'undefined' && this.shiftForm.controls.MontagShiftControl.value)) ||
      (this.shiftForm.controls.DienstagStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.DienstagShiftControl.value != 'undefined' && this.shiftForm.controls.DienstagShiftControl.value)) ||
      (this.shiftForm.controls.MittwochStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.MittwochShiftControl.value != 'undefined' && this.shiftForm.controls.MittwochShiftControl.value)) ||
      (this.shiftForm.controls.DonnerstagStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.DonnerstagShiftControl.value != 'undefined' && this.shiftForm.controls.DonnerstagShiftControl.value)) ||
      (this.shiftForm.controls.FreitagStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.FreitagShiftControl.value != 'undefined' && this.shiftForm.controls.FreitagShiftControl.value)) ||
      (this.shiftForm.controls.SamstagStatusControl.value === "WORKING" && !(typeof this.shiftForm.controls.SamstagShiftControl.value != 'undefined' &&  this.shiftForm.controls.SamstagShiftControl.value))) {
      this.errorHidden = false;
    } else {
      this.weekShift.entries[this.shiftEntryIndex] = this.weekShiftEntry;
      this.propsToRemove.forEach(element => {
        delete this.weekShift[element];
      });
      this.schedulerService.setWeekShift(this.weekShift);

      this.notifyParent.emit();
      const modalRef = this.modalService.open(SuccessPageComponent, { centered: true });
      modalRef.componentInstance.message = "Die ausgewählte Schicht wurde erfolgreich geändert."
    }
  }

}
