import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OPDEFComponent } from './opdef.component';
const routes: Routes = [

  { path: '', component: OPDEFComponent, data: { breadcrumb: 'OPDEF'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OPDEFRoutingModule { }
