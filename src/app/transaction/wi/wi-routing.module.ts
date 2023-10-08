import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkInstructionComponent } from './work-instruction/work-instruction.component';
const routes: Routes = [

  { path: '', component: WorkInstructionComponent, data: { breadcrumb: 'Work Instruction'}  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WIRoutingModule { }