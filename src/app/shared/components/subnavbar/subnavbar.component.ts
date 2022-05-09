import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.scss']
})

export class SubnavbarComponent implements OnInit {
  @Input() topTitle: string | undefined;
  @Input() midTitle: string | undefined;
  @Input() botTitle: string | undefined;

  topCon = false;
  midCon = false;
  botCon = false;

  active = 'top';

  authService;
  employeeService;
  constructor(aService: AuthService, eService: EmployeeService) {
    this.authService = aService;
    this.employeeService = eService;
  }

  ngOnInit(): void {
    if (this.topTitle !== undefined) {
      this.topCon = true;
    } if (this.midTitle !== undefined) {
      this.midCon = true;
    } if (this.botTitle !== undefined) {
      this.botCon = true;
    }
  }

  logout() {
    this.authService.logout();
  }

  employee() {
    this.employeeService.getEmployee();
  }

}
