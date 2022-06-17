import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BackendError } from '../models/error-message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from '../components/error-page/error-page.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: NgbModal) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let error: BackendError;
        console.log(err);
        if (err instanceof ErrorEvent) {
          // this is client side error
          this.handleUnknownError();
        } else {
          // this is server side error
          this.handleBackendError(error, err);
        }
        return throwError(() => error);
      })
    );
  }

  private handleUnknownError(): void {
    // this is not from backend. Format our own message.
    console.log("client error");
  }

  private handleBackendError(error: BackendError, err): void {
    const modalRef = this.modalService.open(ErrorPageComponent, { centered: true });
    err.title = "Oops! Something went wrong."
    modalRef.componentInstance.error = err;
  }
}
