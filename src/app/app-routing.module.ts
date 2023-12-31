import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './service/authguard.guard';
import { LoginComponent } from 'src/app/authenticate/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'authenticate/login' , pathMatch: 'full' },
	  {
      path: 'authenticate',
      loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
    },

    {
      path: 'locations',
      loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Locations'}
    },
    {
      path: 'transaction',
      loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Transaction'}
    },
    {
      path: 'psr',
      loadChildren: () => import('./transaction/psr/psr.module').then(m => m.PsrModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Psr'}
    },
    {
      path: 'masters',
      loadChildren: () => import('./master/master.module').then(m => m.MasterModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Global Masters'}
    },
    {
      path: 'error',
      loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthguardGuard]
    },
    {
      path: 'access-module',
      loadChildren: () => import('./access-module/access-module.module').then(m => m.AccessModuleModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Access Module'}
    },
    {
      path: 'general',
      loadChildren: () => import('./general/general.module').then(m => m.GeneralModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'General'}
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Reports'}
    },
    {
      path: 'project-list',
      loadChildren: () => import('./project-list/project-list.module').then(m => m.ProjectListModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Project List'}
    },
    {
      path: 'config',
      loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Configuration'}
    },

    { path: 'token', loadChildren: () => import('./token/token.module').then(m => m.TokenModule), canActivate:[AuthguardGuard],
      data: { breadcrumb: 'Token'} },
    { path: 'analysis', loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule) },
    { path: '**', redirectTo: 'authenticate/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
