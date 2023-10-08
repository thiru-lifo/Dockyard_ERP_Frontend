import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { JobCardRoutingModule } from './job-card-routing.module';

import { JobCardComponent } from './job-card.component';




@NgModule({
  declarations: [
    JobCardComponent,
  ],
  imports: [
    CommonModule,
    JobCardRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class JobCardModule { }
