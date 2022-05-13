import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Group } from '../shared/models/group';
import { EmployeeService } from '../shared/services/employee-service';
import { GroupService } from '../shared/services/group-service';
import { WorkerFormComponent } from './worker-form/worker-form.component';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})

export class MitarbeiterComponent implements OnInit {
  showWorkerForm: boolean = false;
  showNewEmployeeForm: boolean = false;
  toggleGroup: boolean = true;

  topTitle: string = 'Mitarbeiter';
  midTitle: string = 'Gruppen';
  botTitle: string = 'Schichtplan';

  buttonTitleNewWorker = 'Neuer Mitarbeiter';
  buttonTitleGroup = 'Mitarbeiter in dieser Gruppe verwalten';
  buttonTitleWorker = 'Neuer Mitarbeiter';

  iconMitarbeiter = "mitarbeiter";
  iconGroup = "group";

  employeeList: Employee[];
  groupList: Group[];

  groupService;
  employeeService;
  constructor(eService: EmployeeService, gService: GroupService) {
    this.employeeService = eService;
    this.groupService = gService;
    this.employeeList = this.employeeService.getAllEmployees();
    this.groupList = this.groupService.getAllGroups();
  }

  ngOnInit(): void {
  }

  @ViewChild(WorkerFormComponent) wfc: WorkerFormComponent;

  itemDetails(value: any) {
    document.getElementById("workerForm").removeAttribute("hidden");
    this.wfc.changeEntrys(value);
  }

  showForms(value) {
    this.showWorkerForm = !value;
    this.showNewEmployeeForm = value;
  }

}
