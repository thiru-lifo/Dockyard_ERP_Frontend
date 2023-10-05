import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RaComponent } from './ra.component';
const routes: Routes = [

  { path: '', component: RaComponent, data: { breadcrumb: 'RA'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaRoutingModule { }
