import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { ManpowerBookingRoutingModule } from './manpower-booking-routing.module';

import { ManpowerBookingComponent } from './manpower-booking.component';




@NgModule({
  declarations: [
    ManpowerBookingComponent,
  ],
  imports: [
    CommonModule,
    ManpowerBookingRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ManpowerBookingModule { }
