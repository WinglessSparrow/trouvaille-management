import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  employeeForm: FormGroup;

  constructor(eService: EmployeeService) {
    this.employeeService = eService;
    this.employee = new Employee();

    this.employeeForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phonenumber: new FormControl(),
      targetweeklyworkinghours: new FormControl(),
      passwordNew: new FormControl(),
      passwordAgain: new FormControl(),
      employeeStatus: new FormControl(),
      birthday: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  public changeEntrys(e: Employee) {
    this.employee = e;
  }

  propsToRemove = [
    "group",
    "loginfailedcounter",
    "usersafetycode",
    "usersafetycodedate",
    "usersafetycodeexpiredate",
    "salt",
    "createdat",
    "lastpasswordresetat",
    "inactiveList",
    "text"
  ]

  public changeEmployee(employeeForm): void {
    for (let [key, value] of Object.entries(employeeForm)) {
      for (let [keyOld] of Object.entries(this.employee)) {
        this.propsToRemove.forEach(element => {
          delete this.employee[element];
        });

        if (key === keyOld) {
          if (value !== null) {
            this.employee[key] = value;
          }
        }
      }
    }
    this.employeeService.changeEmployee(this.employee);
    this.employee.text = this.employee.firstname + " " + this.employee.lastname;
  }

}
