import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainElementRoutingModule } from './main-element-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';

import { MainElementComponent } from './main-element.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [MainElementComponent],
    imports: [CommonModule, SharedModule, MainElementRoutingModule, NavbarComponent]
})
export class MainElementModule { }
