import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

@Injectable()
export class EmployeeService {
    url = 'http://td.vvjm.dev/api/v1/employee';
    body;
    header;
    authService;

    constructor(private http: HttpClient, aService: AuthService) {
        this.authService = aService;
    }

    public getEmployee() {
        var tk = this.authService.getToken();
        var headers_object = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': tk
        });

        const httpOptions = {
            headers: headers_object
        };

        console.log(this.authService.getToken());
        this.http.post(this.url, { limit: 10 }, httpOptions).subscribe();
    }

    //data => {console.log(data);}
}
