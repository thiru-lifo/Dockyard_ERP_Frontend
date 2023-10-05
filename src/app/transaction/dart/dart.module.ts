import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { PsrRoutingModule } from './dart-routing.module';

import { DartComponent } from './dart.component';




@NgModule({
  declarations: [
    DartComponent,
  ],
  imports: [
    CommonModule,
    PsrRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PsrModule { }
