import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { AttendanceReportRoutingModule } from './attendance-report-routing.module';

import { AttendanceReportComponent } from './attendance-report.component';




@NgModule({
  declarations: [
    AttendanceReportComponent,
  ],
  imports: [
    CommonModule,
    AttendanceReportRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AttendanceReportModule { }
