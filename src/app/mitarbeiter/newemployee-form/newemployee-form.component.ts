import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../../shared/services/employee-service';

@Component({
  selector: 'app-newemployee-form',
  templateUrl: './newemployee-form.component.html',
  styleUrls: ['./newemployee-form.component.scss']
})
export class NewemployeeFormComponent implements OnInit {
  @Input() employeeList: Employee[];

  employee: Employee;
  employeeService: EmployeeService;
  employeeForm: FormGroup;

  lastname: FormControl;
  email: FormControl;
  phonenumber: FormControl;
  targetweeklyworkinghours: FormControl;
  password: FormControl;
  passwordAgain: FormControl;
  employeeStatus: FormControl;
  birthday: FormControl;
  groupIdgroup: FormControl;  

  get firstname() { return this.employeeForm.get('firstname'); }

  constructor(eService: EmployeeService) {
    this.employeeService = eService;
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required, Validators.minLength(4)]),
      lastname: new FormControl(this.lastname,Validators.required),
      email: new FormControl(this.email,[Validators.required, Validators.email]),
      phonenumber: new FormControl(this.phonenumber),
      targetweeklyworkinghours: new FormControl(this.targetweeklyworkinghours),
      password: new FormControl(this.password,Validators.required),
      passwordAgain: new FormControl(this.passwordAgain,Validators.required),
      employeeStatus: new FormControl(this.employeeStatus),
      birthday: new FormControl(this.birthday),
      groupIdgroup: new FormControl(this.groupIdgroup,Validators.required)
    });
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
    // add new employee to employeelist
    this.employee.text = this.employee.firstname + " " + this.employee.lastname;
    this.employeeList.push(this.employee);
  }

}
