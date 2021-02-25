import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {path: '', component: Error404Component},
]

@NgModule({
  declarations: [Error404Component],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ErrorModule { }
