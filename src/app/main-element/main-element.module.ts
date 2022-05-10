import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainElementRoutingModule } from './main-element-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, MainElementRoutingModule]
})
export class MainElementModule { }
