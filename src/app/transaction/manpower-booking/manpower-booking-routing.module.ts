import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManpowerBookingComponent } from './manpower-booking.component';
const routes: Routes = [

  { path: '', component: ManpowerBookingComponent, data: { breadcrumb: 'Manpower Booking'}  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManpowerBookingRoutingModule { }
