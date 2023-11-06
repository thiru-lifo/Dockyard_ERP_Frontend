import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { GeneratePaySlipRoutingModule } from './generate-pay-slip-routing.module';

import { GeneratePaySlipComponent } from './generate-pay-slip.component';









@NgModule({
  declarations: [
    GeneratePaySlipComponent,
  ],
  imports: [
    CommonModule,
    GeneratePaySlipRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class  GeneratePaySlipModule { }
