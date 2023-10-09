import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { OPDEFRoutingModule } from './opdef-routing.module';

import { OPDEFComponent } from './opdef.component';




@NgModule({
  declarations: [
    OPDEFComponent,
  ],
  imports: [
    CommonModule,
    OPDEFRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class OPDEFModule { }
