import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../shared/models/employee';
import { Group } from '../../shared/models/group';
import { EmployeeService } from '../../shared/services/employee-service';
import { CustomValidators } from '../../shared/util/custom-validators';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss']
})

export class WorkerFormComponent implements OnInit {
  employee: Employee;
  employeeService: EmployeeService;
  employeeForm: FormGroup;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() employeeChangedEvent: EventEmitter<any> = new EventEmitter();

  constructor(eService: EmployeeService, private modalService: NgbModal) {
    this.employeeService = eService;
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phonenumber: new FormControl(null),
      targetweeklyworkinghours: new FormControl(null),
      password: new FormControl(null, [
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/\W|_/g, { hasSpecialCharacters: true }),
      ]),
      confirmPassword: new FormControl(null, [Validators.minLength(8)]),
      employeeStatus: new FormControl(null),
      birthday: new FormControl(null, [
        Validators.required,
        CustomValidators.patternValidator(/^\d{2}[.]\d{2}[.]\d{4}$/, { isDate: true }),
        CustomValidators.birthday({ ageCheck: true })]),
      groupIdgroup: new FormControl(null, Validators.required)
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

  public changeEntrys(e: Employee) {
    console.log(e.group.groupname);
    console.log(e.groupIdgroup);
    if (this.employee != e) {
      this.employee = e;
      this.employeeForm = new FormGroup({
        firstname: new FormControl(this.employee.firstname, [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl(this.employee.lastname, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(this.employee.email, [Validators.required, Validators.email]),
        phonenumber: new FormControl(this.employee.phonenumber),
        targetweeklyworkinghours: new FormControl(this.employee.targetweeklyworkinghours),
        password: new FormControl(null, [
          Validators.minLength(8),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidators.patternValidator(/\W|_/g, { hasSpecialCharacters: true }),
        ]),
        confirmPassword: new FormControl(null, [Validators.minLength(8)]),
        employeeStatus: new FormControl(null),
        birthday: new FormControl(this.employee.birthday, [
          Validators.required,
          CustomValidators.patternValidator(/^\d{2}[.]\d{2}[.]\d{4}$/, { isDate: true })]),
        groupIdgroup: new FormControl(this.employee.groupIdgroup, Validators.required)
      }, {
        validators: [CustomValidators.match]
      });
    }
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

    if (employeeForm.password) {
      this.employee.password = employeeForm.password;
    }

    console.log(this.employee);

    this.employeeService.changeEmployee(this.employee).subscribe(() => {
      this.employee.text = this.employee.firstname + " " + this.employee.lastname;
      this.employee.group = new Group();

      this.employeeChangedEvent.emit();
    });

  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee).subscribe(() => {
      this.notifyParent.emit(this.employee);
    });;
  }

  Validation() {
    if (
      this.firstname.invalid ||
      this.lastname.invalid ||
      this.email.invalid ||
      this.phonenumber.invalid ||
      this.targetweeklyworkinghours.invalid ||
      this.employeeStatus.invalid ||
      this.groupIdgroup.invalid) {
      return true;
    }
    return false;
  }
}
