import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { LoginComponent } from "../../login/login.component";
import { MainElementComponent } from "../../main-element/main-element.component";
import { GlobalResponse } from "../models/global-response";

interface UserData {
    email: string;
    token: string;
    expirationDate: string;
    authorities: string[];
}

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main-element', component: MainElementComponent },
];

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable()
export class AuthService {
    authResp: GlobalResponse;
    authData: UserData;

    constructor(private http: HttpClient, private router: Router) {
    }

    public login(username: string, password: string) {
        return this.http
            .post<GlobalResponse>('https://td.vvjm.dev/api/auth', { username, password }).subscribe(data => {
                this.authData = data.data[0];
                this.authResp = data;
                if (!this.authResp.hasError) {
                    this.saveToken(this.authData.token);
                    this.saveUserData(this.authData);
                    this.router.navigate(['/main-element']);
                }
            });
    }

    public logout(): void {
        window.sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    saveUserData(userData: UserData): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
    }

    public getUserData(): UserData {
        const userData = window.sessionStorage.getItem(USER_KEY);
        if (userData) {

            console.log(JSON.parse(userData));
            return JSON.parse(userData);
        }
        return null;
    }

    //todo: exp.date
    public isAuthenticated(): boolean {
        if (this.getToken()) {
            return true;
        }
        return false;
    }
}