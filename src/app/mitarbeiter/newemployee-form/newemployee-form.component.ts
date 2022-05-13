import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../../shared/services/employee-service';

@Component({
  selector: 'app-newemployee-form',
  templateUrl: './newemployee-form.component.html',
  styleUrls: ['./newemployee-form.component.scss']
})
export class NewemployeeFormComponent implements OnInit {
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
      password: new FormControl(),
      passwordAgain: new FormControl(),
      employeeStatus: new FormControl(),
      birthday: new FormControl(),
      groupIdgroup: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  propsToRemove = [
    "idemployee",
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

  public createEmployee(employeeForm): void {
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
    this.employeeService.createEmployee(this.employee);
  }

}
