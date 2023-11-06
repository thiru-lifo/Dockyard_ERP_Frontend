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
    path: 'opdef',
     loadChildren: () => import('./opdef/opdef.module').then(m => m.OPDEFModule), data: { breadcrumb: 'OPDEF'}
   },
   {
    path: 'wi',
     loadChildren: () => import('./wi/wi.module').then(m => m.WIModule), data: { breadcrumb: 'WI'}
   },
   {
    path: 'job-card',
     loadChildren: () => import('./job-card/job-card.module').then(m => m.JobCardModule), data: { breadcrumb: 'Job Card'}
   },
   {
    path: 'attendance',
     loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule), data: { breadcrumb: 'Attendance'}
   },
   {
    path: 'attendance-report',
     loadChildren: () => import('./attendance-report/attendance-report.module').then(m => m.AttendanceReportModule), data: { breadcrumb: 'Attendance Report'}
    },
    {
    path: 'monthly-salary',
     loadChildren: () => import('./monthly_salary/monthly_salary.module').then(m => m.MonthlySalaryModule), data: { breadcrumb: 'Monthly Salary'}
   },
   {
    path: 'monthly-credits-debits',
     loadChildren: () => import('./monthly-credits-debits/monthly-credits-debits.module').then(m => m.MonthlyCreditsDebitsModule), data: { breadcrumb: 'Monthly Credits Debits'}
   },
   {
    path: 'manpower-booking',
     loadChildren: () => import('./manpower-booking/manpower-booking.module').then(m => m.ManpowerBookingModule), data: { breadcrumb: 'Manpower Booking'}
   },
    {
    path: 'generate-pay-slip',
     loadChildren: () => import('./generate-pay-slip/generate-pay-slip.module').then(m => m.GeneratePaySlipModule), data: { breadcrumb: 'Generate Pay Slip'}
   },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }