/* eslint-disable @typescript-eslint/quotes */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
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

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, "./assets/i18n/", ".json");

@NgModule({
  declarations: [AppComponent, StatistikComponent, MitarbeiterComponent, NavbarComponent, LieferungenComponent, AutosComponent, RoutenComponent, MainElementComponent, WorkerFormComponent, LieferungenFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    DetailModule,
    LoginModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
  ],
  providers: APP_CONFIG.IOC,
  bootstrap: [AppComponent],
})
export class AppModule { }
