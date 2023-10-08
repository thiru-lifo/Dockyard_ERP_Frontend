import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';

import { WIRoutingModule } from './wi-routing.module';
import { WorkInstructionComponent } from './work-instruction/work-instruction.component';


@NgModule({
  declarations: [
    WorkInstructionComponent
  ],
  imports: [
    CommonModule,
    WIRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WIModule { }
