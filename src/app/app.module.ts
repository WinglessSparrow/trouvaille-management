/* eslint-disable @typescript-eslint/quotes */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

// eslint-disable-next-line @typescript-eslint/quotes
import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { DetailModule } from "./detail/detail.module";
import { LoginModule } from "./login/login.module";

import { AppComponent } from "./app.component";

import { APP_CONFIG } from "./../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatistikComponent } from './statistik/statistik.component';
import { MitarbeiterComponent } from './mitarbeiter/mitarbeiter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LieferungenComponent } from './lieferungen/lieferungen.component';
import { AutosComponent } from './autos/autos.component';
import { RoutenComponent } from './routen/routen.component';
import { MainElementComponent } from './main-element/main-element.component';
import { WorkerFormComponent } from "./mitarbeiter/worker-form/worker-form.component";
import { LieferungenFormComponent } from "./lieferungen/lieferungen-form/lieferungen-form.component";
import { AuthService } from "./shared/services/auth-service";
import { EmployeeService } from "./shared/services/employee-service";
import { NeuesPaketFormComponent } from "./lieferungen/neues-paket-form/neues-paket-form.component";
import { QrFormComponent } from "./lieferungen/qr-form/qr-form.component";
import { AuthInterceptor } from "./shared/services/auth-interceptor";
import { NewemployeeFormComponent } from "./mitarbeiter/newemployee-form/newemployee-form.component";
import { GroupService } from "./shared/services/group-service";
import { DeliveryService } from "./shared/services/delivery-service";
import { CarFormComponent } from './autos/car-form/car-form.component';
import { NewCarFormComponent } from './autos/new-car-form/new-car-form.component';
import { DriverHistoryComponent } from './autos/driver-history/driver-history.component';
import { DeliveryHistoryComponent } from "./lieferungen/delivery-history/delivery-history.component";
import { RouteViewComponent } from './routen/route-view/route-view.component';
import { SchedulerFormComponent } from "./mitarbeiter/scheduler-form/scheduler-form.component";
import { HttpErrorInterceptor } from "./shared/services/http-error.interceptor";
import { SchedulerService } from "./shared/services/scheduler-service";
import { CommonModule } from "@angular/common";
import { ShiftFormComponent } from "./mitarbeiter/scheduler-form/shift-form/shift-form.component";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, StatistikComponent, MitarbeiterComponent, NavbarComponent, LieferungenComponent, AutosComponent, RoutenComponent, MainElementComponent, WorkerFormComponent, LieferungenFormComponent, NeuesPaketFormComponent, QrFormComponent, DeliveryHistoryComponent,
    NewemployeeFormComponent,
    CarFormComponent,
    NewCarFormComponent,
    DriverHistoryComponent,
    RouteViewComponent,
    SchedulerFormComponent,
    ShiftFormComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    DetailModule,
    LoginModule,
    AppRoutingModule,
    CommonModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps: [HttpClient],
      },
    }),
    NgbModule,
  ],
  providers: [
    APP_CONFIG.IOC,
    AuthService,
    EmployeeService,
    GroupService,
    DeliveryService,
    SchedulerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
