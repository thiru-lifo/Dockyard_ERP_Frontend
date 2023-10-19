import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { MonthlySalaryRoutingModule } from './monthly_salary_routing.module';

import { MonthlySalaryComponent } from './monthly_salary.component';









@NgModule({
  declarations: [
    MonthlySalaryComponent ,
  ],
  imports: [
    CommonModule,
    MonthlySalaryRoutingModule ,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class  MonthlySalaryModule { }
