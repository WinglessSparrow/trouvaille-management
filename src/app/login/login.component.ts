import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MainElementComponent } from '../main-element/main-element.component';
import { AuthService } from '../shared/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  routes: Routes = [
    { path: 'main-element', component: MainElementComponent },
  ];

  authService;
  constructor(aService: AuthService, private router: Router) {
    this.authService = aService;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main-element']);
    }
  }

  onClickSubmit(data) {
    this.authService.login(data.username, data.password);
  }

}
