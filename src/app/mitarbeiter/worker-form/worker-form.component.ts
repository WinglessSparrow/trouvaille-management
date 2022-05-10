import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../../shared/services/employee-service';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss']
})
export class WorkerFormComponent implements OnInit {
  employee: Employee;
  employeeService: EmployeeService;

  constructor(eService: EmployeeService) {
    this.employeeService = eService;
    this.employee = new Employee();
  }

  ngOnInit(): void {
  }

  public changeEntrys(e: Employee) {
    this.employee = e;
    console.log(this.employee);
  }
}
