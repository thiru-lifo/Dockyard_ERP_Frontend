import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthlyCreditsDebitsComponent } from './monthly-credits-debits.component';
const routes: Routes = [

  { path: '', component: MonthlyCreditsDebitsComponent, data: { breadcrumb: 'Monthly Credits Debits'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyCreditsDebitsRoutingModule { }
