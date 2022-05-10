import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;
  authService: AuthService;

  constructor(aService: AuthService) {
    this.authService = aService;
  }

  ngOnInit(): void {
    this.userName = this.authService.getUserData().email;
  }

}
