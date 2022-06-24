import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalErrorHandler } from "../shared/services/global-error-handler";
import { HttpErrorInterceptor } from "../shared/services/http-error.interceptor";

@NgModule({
  declarations: [],
  imports: [CommonModule],

})
export class CoreModule { }
