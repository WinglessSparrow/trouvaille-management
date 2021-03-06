import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../shared/models/employee';
import { Group } from '../../shared/models/group';
import { EmployeeService } from '../../shared/services/employee-service';
import { CustomValidators } from '../../shared/util/custom-validators';

@Component({
  selector: 'app-newemployee-form',
  templateUrl: './newemployee-form.component.html',
  styleUrls: ['./newemployee-form.component.scss']
})
export class NewemployeeFormComponent implements OnInit {
  @Input() employeeList: Employee[];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentClose: EventEmitter<any> = new EventEmitter();

  employee: Employee;
  employeeService: EmployeeService;
  employeeForm: FormGroup;

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

  constructor(eService: EmployeeService) {
    this.employeeService = eService;
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(null,[Validators.required, Validators.email]),
      phonenumber: new FormControl(null),
      targetweeklyworkinghours: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/\W|_/g, { hasSpecialCharacters: true }),
      ]),
      confirmPassword: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      employeeStatus: new FormControl(null),
      birthday: new FormControl(null, [
        Validators.required,
        CustomValidators.patternValidator(/^\d{2}[.]\d{2}[.]\d{4}$/, { isDate: true }),
        CustomValidators.birthday({ ageCheck: true })]),
      groupIdgroup: new FormControl(null,Validators.required)
    }, {
      validators: [CustomValidators.match]
    });
  }

  get firstname() { return this.employeeForm.get('firstname'); }
  get lastname() { return this.employeeForm.get('lastname'); }
  get email() { return this.employeeForm.get('email'); }
  get phonenumber() { return this.employeeForm.get('phonenumber'); }
  get targetweeklyworkinghours() { return this.employeeForm.get('targetweeklyworkinghours'); }
  get password() { return this.employeeForm.get('password'); }
  get confirmPassword() { return this.employeeForm.get('confirmPassword'); }
  get employeeStatus() { return this.employeeForm.get('employeeStatus'); }
  get birthday() { return this.employeeForm.get('birthday'); }
  get groupIdgroup() { return this.employeeForm.get('groupIdgroup'); }

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
    this.employeeService.createEmployee(this.employee).subscribe(() => {
      this.employee.text = this.employee.firstname + " " + this.employee.lastname;
      this.employee.group = new Group();

      this.notifyParent.emit(this.employee);
    });
  }

  cancle() {
    this.notifyParentClose.emit();
  }

  Validation() {
    if (
      this.firstname.invalid ||
      this.lastname.invalid ||
      this.email.invalid ||
      this.phonenumber.invalid ||
      this.targetweeklyworkinghours.invalid ||
      this.password.invalid ||
      this.confirmPassword.invalid ||
      this.employeeStatus.invalid ||
      this.birthday.invalid ||
      this.groupIdgroup.invalid)
    {
      return true;  
    }
    return false;
  }

}
