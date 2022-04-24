import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainElementComponent } from './main-element.component';

const routes: Routes = [
    {
        path: 'main-element',
        component: MainElementComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainElementRoutingModule { }
