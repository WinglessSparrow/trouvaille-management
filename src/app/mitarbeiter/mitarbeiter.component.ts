import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employee-service';
import { WorkerFormComponent } from './worker-form/worker-form.component';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})

export class MitarbeiterComponent implements OnInit {
  toggleGroup = true;

  topTitle = 'Mitarbeiter';
  midTitle = 'Gruppen';
  botTitle = 'Schichtplan';

  buttonTitleNewWorker = 'Neuer Mitarbeiter';
  buttonTitleGroup = 'Mitarbeiter in dieser Gruppe verwalten';
  buttonTitleWorker = 'Neuer Mitarbeiter';

  iconMitarbeiter = "mitarbeiter";
  iconGroup = "group";

  employeeList: Employee[];

  groupList = [
    {
      text: "Gruppe 1"
    },
    {
      text: "Gruppe 2"
    },
    {
      text: "Gruppe 3"
    },
    {
      text: "Gruppe 4"
    },
    {
      text: "Gruppe 5"
    },
  ]

  employeeService;
  constructor(eService: EmployeeService) {
    this.employeeService = eService;
    this.employeeList = this.employeeService.getAllEmployees();
  }

  ngOnInit(): void {
  }

  @ViewChild(WorkerFormComponent) wfc: WorkerFormComponent;

  itemDetails(value: any) {
    document.getElementById("workerForm").removeAttribute("hidden");
    this.wfc.changeEntrys(value);
  }
}
