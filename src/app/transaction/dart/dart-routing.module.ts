import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DartComponent } from './dart.component';
const routes: Routes = [

  { path: '', component: DartComponent, data: { breadcrumb: 'Dart'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsrRoutingModule { }
