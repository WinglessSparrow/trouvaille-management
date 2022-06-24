import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';
import { ListviewComponent } from './components/listview/listview.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { ErrPageComponent } from './components/err-page/err-page.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SubnavbarComponent, ListviewComponent, ScannerComponent, ErrorPageComponent, SuccessPageComponent, ErrPageComponent],
  imports: [CommonModule, TranslateModule, FormsModule, NgbModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SubnavbarComponent, ListviewComponent, ScannerComponent]
})
export class SharedModule { }
