import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { MonthlyCreditsDebitsRoutingModule } from './monthly-credits-debits-routing.module';

import { MonthlyCreditsDebitsComponent } from './monthly-credits-debits.component';




@NgModule({
  declarations: [
    MonthlyCreditsDebitsComponent,
  ],
  imports: [
    CommonModule,
    MonthlyCreditsDebitsRoutingModule,
    NgbModule,
    AngularEditorModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class MonthlyCreditsDebitsModule { }
