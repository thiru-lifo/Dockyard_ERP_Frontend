import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

    {
    path: 'dart',
     loadChildren: () => import('./dart/dart.module').then(m => m.PsrModule), data: { breadcrumb: 'DART'}
   },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }