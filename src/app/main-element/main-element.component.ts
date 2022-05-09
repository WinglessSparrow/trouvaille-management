import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../shared/services/auth-service';

@Component({
  selector: 'app-main-element',
  templateUrl: './main-element.component.html',
  styleUrls: ['./main-element.component.scss']
})
export class MainElementComponent implements OnInit {

  authService;
  routes: Routes = [
    { path: 'login', component: LoginComponent },
  ];

  constructor(aService: AuthService, private router: Router) {
    this.authService = aService;
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

}
