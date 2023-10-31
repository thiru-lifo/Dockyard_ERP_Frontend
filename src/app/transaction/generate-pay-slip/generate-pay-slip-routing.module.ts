import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneratePaySlipComponent } from './generate-pay-slip.component';
const routes: Routes = [

  { path: '', component: GeneratePaySlipComponent, data: { breadcrumb: 'Generate Pay Slip'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePaySlipRoutingModule { }

