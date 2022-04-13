import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { MainElementRoutingModule } from './main-element/main-element-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-element',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    DetailRoutingModule,
    LoginRoutingModule,
    MainElementRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
