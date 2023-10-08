import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

    {
    path: 'dart',
     loadChildren: () => import('./dart/dart.module').then(m => m.PsrModule), data: { breadcrumb: 'DART'}
   },
   {
    path: 'ra',
     loadChildren: () => import('./ra/ra.module').then(m => m.RaModule), data: { breadcrumb: 'RA'}
   },
   {
    path: 'wi',
     loadChildren: () => import('./wi/wi.module').then(m => m.WIModule), data: { breadcrumb: 'WI'}
   },
   {
    path: 'job-card',
     loadChildren: () => import('./job-card/job-card.module').then(m => m.JobCardModule), data: { breadcrumb: 'Job Card'}
   },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }