import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthlySalaryComponent } from './monthly_salary.component';
const routes: Routes = [

  { path: '', component: MonthlySalaryComponent, data: { breadcrumb: 'Monthly Salary'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlySalaryRoutingModule { }

