import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { AttendanceRoutingModule } from './attendance-routing.module';

import { AttendanceComponent } from './attendance.component';




@NgModule({
  declarations: [
    AttendanceComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AttendanceModule { }
