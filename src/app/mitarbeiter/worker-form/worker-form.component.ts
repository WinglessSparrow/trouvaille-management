import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessPageComponent } from '../../shared/components/success-page/success-page.component';
import { Employee } from '../../shared/models/employee';
import { Group } from '../../shared/models/group';
import { EmployeeService } from '../../shared/services/employee-service';
import { CustomValidators } from '../../shared/util/custom-validators';
import { ViewContainerRef } from '@angular/core';

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

  constructor(eService: EmployeeService, private modalService: NgbModal, private viewContainerRef: ViewContainerRef) {
    this.employeeService = eService;
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(this.employee.firstname,[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(this.employee.lastname,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.employee.email,[Validators.required, Validators.email]),
      phonenumber: new FormControl(this.employee.phonenumber),
      targetweeklyworkinghours: new FormControl(this.employee.targetweeklyworkinghours),
      password: new FormControl(null, [
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/\W|_/g, { hasSpecialCharacters: true }),
      ]),
      confirmPassword: new FormControl(null,[Validators.minLength(8)]),
      employeeStatus: new FormControl(null),
      birthday: new FormControl(this.employee.birthday, [
        Validators.required,
        CustomValidators.patternValidator(/^\d{2}[.]\d{2}[.]\d{4}$/, { isDate: true }),
        CustomValidators.birthday({ ageCheck: true })]),
      groupIdgroup: new FormControl(this.employee.groupIdgroup,Validators.required)
    }, {
      validators: [CustomValidators.match]
    });
  }

  private selfClose() {
    this.viewContainerRef
     .element
     .nativeElement
     .parentElement
     .removeChild(this.viewContainerRef.element.nativeElement);
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
    this.employee = e;
    this.employeeForm = new FormGroup({
      firstname: new FormControl(this.employee.firstname,[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(this.employee.lastname,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.employee.email,[Validators.required, Validators.email]),
      phonenumber: new FormControl(this.employee.phonenumber),
      targetweeklyworkinghours: new FormControl(this.employee.targetweeklyworkinghours),
      password: new FormControl(null, [
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/\W|_/g, { hasSpecialCharacters: true }),
      ]),
      confirmPassword: new FormControl(null,[Validators.minLength(8)]),
      employeeStatus: new FormControl(null),
      birthday: new FormControl(this.employee.birthday, [
        Validators.required,
        CustomValidators.patternValidator(/^\d{2}[.]\d{2}[.]\d{4}$/, { isDate: true })]),
      groupIdgroup: new FormControl(this.employee.groupIdgroup,Validators.required)
    }, {
      validators: [CustomValidators.match]
    });
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
    this.employee.group = new Group();
    const modalRef = this.modalService.open(SuccessPageComponent, { centered: true });
    modalRef.componentInstance.message = "Der Mitarbeiter wurde erfolgreich bearbeitet."
    this.selfClose();
  }

  toggleEmployee(toggle: boolean) { 
    var msg: string = "";
    for (let [key] of Object.entries(this.employee)) {
      this.propsToRemove.forEach(element => {
        delete this.employee[element];
      });

      if (key == "isdeleted") {
        this.employee[key] = toggle;
      }
    }

    if (toggle) {
      msg = "Der Mitarbeiter wurde erfolgreich deaktiviert.";
    } else {
      msg = "Der Mitarbeiter wurde erfolgreich aktiviert."
    }

    this.employeeService.changeEmployee(this.employee);
    this.employee.text = this.employee.firstname + " " + this.employee.lastname;
    this.employee.group = new Group();
    const modalRef = this.modalService.open(SuccessPageComponent, { centered: true });
    modalRef.componentInstance.message = msg;
  }

  deleteEmployee(toggle: boolean) { 
    this.employeeService.deleteEmployee(this.employee);
    this.notifyParent.emit(this.employee);
  }

  Validation() {
    if (
      this.firstname.invalid ||
      this.lastname.invalid ||
      this.email.invalid ||
      this.phonenumber.invalid ||
      this.targetweeklyworkinghours.invalid ||
      this.employeeStatus.invalid ||
      this.groupIdgroup.invalid)
    {
      return true;  
    }
    return false;
  }
}
