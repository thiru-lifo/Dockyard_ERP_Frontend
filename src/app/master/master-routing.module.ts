import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrialunitsComponent } from './trialunits/trialunits.component';
import { SatelliteunitsComponent } from './satelliteunits/satelliteunits.component';
import { ShipComponent } from './ship/ship.component';
import { ShipsComponent } from './ships/ships.component';
import { CompartmentComponent } from './compartment/compartment.component';
import { SystemComponent } from './system/system.component';

//import { SectionsComponent } from './sections/sections.component';
import { EquipmentComponent } from './equipment/equipment.component';

import { StatusComponent } from './status/status.component';
import { TrialtypesComponent } from './trialtypes/trialtypes.component';
import { UsersComponent } from './users/users.component';
import { BoilerComponent } from './boiler/boiler.component';
//import { CommandComponent } from './command/command.component';
import { DepartmentComponent } from './department/department.component';
//import { ProjectsComponent } from './projects/projects.component';
import { DefectListComponent } from './defect_list/defect_list.component';

//import { ProjectTypeComponent } from './project_type/project_type.component';

import { RefitTypeComponent } from './refit_type/refit_type.component';

import { CommandComponent } from './command/command.component';
import { SectionComponent } from './section/section.component';
import { SubSectionComponent } from './sub_section/sub_section.component';
// import { SubSectionComponent } from './sub_section/sub_section.component';
import { GlobalSectionComponent } from './global_section/global_section.component';
import { GlobalSubSectionComponent } from './global_sub_section/global_sub_section.component';
import { GlobalSubSubSectionComponent } from './global_sub_sub_section/global_sub_sub_section.component';

import { ModuleComponent } from './module/module.component';
import { SubModuleComponent } from './sub_module/sub_module.component';
import { TemplateComponent } from './template/template.component';
import { TemplateConfigComponent } from './template_config/template_config.component';
//import { TemplateGenerationComponent } from './template-generation/template-generation.component';


import { SSSMappingComponent } from './sss-mapping/sss-mapping.component';





import { UnitTypeComponent } from './unit_type/unit_type.component';
import { UnitComponent } from './unit/unit.component';
import { AuthorityComponent } from './authority/authority.component';
import { ClassComponent } from './class/class.component';
import { DockyardComponent } from './dockyard/dockyard.component';
//import { DockyardGroupComponent } from './dockyard_group/dockyard_group.component';
import { PrimaryRolesComponent } from './psr/primary_role/primary-roles.component';
import { SecondaryRolesComponent } from './psr/secondary_roles/secondary-roles.component';
import { StandardComponent } from './psr/standard/standard.component';
import {ManpowerInductionComponent} from './psr/manpower_induction/manpower-induction.component';
import{ AcquisitionMethodComponent } from './psr/acquisition_method/acquisition-method.component'
import { SSSComponent } from './psr/sss/sss.component'
import { PSRSectionComponent } from './psr/section/section.component';
import { PSRSubSectionComponent } from './psr/sub_section/sub_section.component';
import{ DocumentSectionsComponent } from './gls/document_sections/document-sections.component'
import{ DocumentSubSectionsComponent } from './gls/document_sub_sections/document-sub-sections.component'
import{ DocumentSubSections2Component } from './gls/document_sub_sections2/document-sub-sections2.component'
import{ AnnexuresComponent } from './gls/annexures/document-annexures.component'
import{ DesignationComponent } from './designation/designation.component';
import { FormMappingComponent } from './form-mapping/form-mapping.component';


import { DockyardGroupComponent } from './dockyard_group/dockyard_group.component';
import { DockyardSubGroupComponent } from './dockyard_sub_group/dockyard_sub_group.component';
import { CenterComponent } from './center/center.component';
import { ShopFloorComponent } from './shop_floor/shop_floor.component';

import { TimeKeepingAttendanceComponent } from './time-keeping-attendance/time-keeping-attendance.component';


import { ManPowerBookingComponent } from './man-power-booking/man-power-booking.component';
import { CategoryTypeComponent } from './category_type/category_type.component';
import { PayScaleComponent } from './pay_scale/pay_scale.component';
import { DemandMasterComponent } from './demand_master/demand_master.component';
import { ItemsMasterComponent } from './items_master/items_master.component';
import { AllowancesMasterComponent } from './allowances_master/allowances_master.component';
import { DeductionsMasterComponent } from './deductions_master/deductions_master.component';
import { PayGradeComponent } from './pay_grade/pay_grade.component';
import { PersonnelTypeComponent } from './personnel_type/personnel_type.component';
import { RankComponent } from './rank/rank.component';
import { StatusMasterComponent } from './status_master/status_master.component';
import { ItemTypeComponent } from './item_type/item_type.component';
import { StorageLocationComponent } from './storage_location/storage_location.component';
import { IssueComponent } from './issue/issue.component';
import { CourseComponent } from './course/course.component';
import { BatchComponent } from './batch/batch.component';
//import { NewDesignComponent } from './new_design/new_design.component';
import { StockCheckComponent } from './stock-check/stock-check.component';



import { OverTimeComponent } from './over_time/over_time.component';
import { HolidayComponent } from './holiday/holiday.component';
import { StockRegisterComponent } from './stock_register/stock_register.component';
import { StockLogComponent } from './stock_log/stock_log.component';


import { PromotionComponent } from './promotion/promotion.component';





const routes: Routes = [
  { path: '', component: TrialunitsComponent, data: { breadcrumb: 'Trial Units'} },
  { path: 'trial_units', component: TrialunitsComponent, data: { breadcrumb: 'Trial Units'}  },
  { path: 'satellite_units', component: SatelliteunitsComponent, data: { breadcrumb: 'Satellite Units'}  },
  //{ path: 'ships', component: ShipsComponent, data: { breadcrumb: 'Ships'}  },
  //{ path: 'sections', component: SectionsComponent, data: { breadcrumb: 'Sections'}  },
  { path: 'equipment', component: EquipmentComponent, data: { breadcrumb: 'Equipment'}  },
  { path: 'status', component: StatusComponent, data: { breadcrumb: 'Status'}  },
  { path: 'trial_types', component: TrialtypesComponent, data: { breadcrumb: 'Trail Types'}  },
  //{ path: 'users', component: UsersComponent, data: { breadcrumb: 'Users'}  },
  { path: 'employee', component: UsersComponent, data: { breadcrumb: 'Employee'}  },
  { path: 'boilers',component:BoilerComponent,data:{breadcrumb: 'Boilers'}},
    //{ path: 'command',component:CommandComponent,data:{breadcrumb: 'Command'}},
  { path: 'department',component:DepartmentComponent,data:{breadcrumb: 'Department'}},
  //{ path: 'projects',component:ProjectsComponent,data:{breadcrumb: 'Projects'}},
  { path: 'defect-list',component:DefectListComponent,data:{breadcrumb: 'Defect List'}},
  
  { path: 'refit-type',component:RefitTypeComponent,data:{breadcrumb: 'Refit type'}},

  { path: 'command',component:CommandComponent,data:{breadcrumb: 'Command'}},
  { path: 'section', component: SectionComponent, data: { breadcrumb: 'Section'}  },
  { path: 'sub-section', component: SubSectionComponent, data: { breadcrumb: 'Sub Section'}  },

  { path: 'global-section', component: GlobalSectionComponent, data: { breadcrumb: 'Global Section'}  },
  { path: 'global-sub-section', component: GlobalSubSectionComponent, data: { breadcrumb: 'Global Sub Section'}  },
  { path: 'global-sub-sub-section', component: GlobalSubSubSectionComponent, data: { breadcrumb: 'Global Sub Sub Section'}  },
  { path: 'global-sub-sub-section', component: GlobalSubSubSectionComponent, data: { breadcrumb: 'Global Sub Sub Section'}  },
  { path: 'module', component: ModuleComponent, data: { breadcrumb: 'Module'}  },
  { path: 'sub-module', component: SubModuleComponent, data: { breadcrumb: 'Sub Module'}  },
  { path: 'template', component: TemplateComponent, data: { breadcrumb: 'Template'}  }, 
  { path: 'template-config', component: TemplateConfigComponent, data: { breadcrumb: 'Template Config'}  }, 
  //{ path: 'template-generation', component: TemplateGenerationComponent, data: { breadcrumb: 'Template Generation'}  }, 

  { path: 'forms-mapping', component: FormMappingComponent, data: { breadcrumb: 'Form Mapping'}  },
  

  { path: 'unit-type', component: UnitTypeComponent, data: { breadcrumb: 'Unit Type'}  },
  { path: 'unit', component: UnitComponent, data: { breadcrumb: 'Unit'}  },
  { path: 'authority', component: AuthorityComponent, data: { breadcrumb: 'Authority'}  },
  { path: 'class', component: ClassComponent, data: { breadcrumb: 'Class'}  },
  { path: 'dockyard', component: DockyardComponent, data: { breadcrumb: 'Dockyard'}  },
  { path: 'dockyard-group', component: DockyardGroupComponent, data: { breadcrumb: 'Dockyard Group'}  },
  { path: 'dockyard-sub-group', component: DockyardSubGroupComponent, data: { breadcrumb: 'Dockyard Sub Group'}  },

  { path: 'center', component: CenterComponent, data: { breadcrumb: 'Center'}  },
  { path: 'shop-floor', component: ShopFloorComponent, data: { breadcrumb: 'Shop Floor'}  },
  { path: 'category_type', component: CategoryTypeComponent, data: { breadcrumb: 'Category Type'}  },
  
  { path: 'pay_scale', component: PayScaleComponent, data: { breadcrumb: 'Pay Scale'}  },
  { path: 'demand-master', component: DemandMasterComponent, data: { breadcrumb: 'Demand Master'}  },
  { path: 'items-master', component: ItemsMasterComponent, data: { breadcrumb: 'Items Master'}  },
  { path: 'allowances-master', component: AllowancesMasterComponent, data: { breadcrumb: 'Allowances Master'}  },
  { path: 'deductions-master', component: DeductionsMasterComponent, data: { breadcrumb: 'Deductions Master'}  },
  
  { path: 'pay-grade', component: PayGradeComponent, data: { breadcrumb: 'Pay Grade'}  },
  { path: 'personnel-type', component: PersonnelTypeComponent, data: { breadcrumb: 'Personnel Type'}  },
  
  { path: 'rank', component: RankComponent, data: { breadcrumb: 'Rank'}  },
  {path: 'status-master', component: StatusMasterComponent, data: { breadcrumb: 'Status Master'}  },
  {path: 'item-type', component: ItemTypeComponent, data: { breadcrumb: 'Item Type'}  },
  {path: 'storage-location', component: StorageLocationComponent, data: { breadcrumb: 'Storage Location'}  },
  {path: 'issue', component: IssueComponent, data: { breadcrumb: 'Issue'}  },
  {path: 'course', component: CourseComponent, data: { breadcrumb: 'Course'}  },
  {path: 'batch', component: BatchComponent, data: { breadcrumb: 'Batch'}  },
  {path: 'over-time', component: OverTimeComponent, data: { breadcrumb: 'Over Time'}  },
  {path: 'holiday', component: HolidayComponent, data: { breadcrumb: 'Holiday'}  },
  {path: 'stock-register', component: StockRegisterComponent, data: { breadcrumb: 'Stock Register'}  },
  {path: 'stock-log', component: StockLogComponent, data: { breadcrumb: 'Stock Log'}  },
  //{path: 'new-design', component: NewDesignComponent, data: { breadcrumb: 'New Design'}  },
  {path: 'stock-check', component: StockCheckComponent, data: { breadcrumb: 'Stock Check'}  },
  
  
  {path: 'promotion', component: PromotionComponent, data: { breadcrumb: 'Promotion'}  },
  
  
  
  
  
  { path: 'ship', component: ShipComponent, data: { breadcrumb: 'Ship'}  },
  { path: 'ships', component: ShipsComponent, data: { breadcrumb: 'Ships'}  },
  { path: 'compartment', component: CompartmentComponent, data: { breadcrumb: 'Compartment'}  },
  { path: 'system', component: SystemComponent, data: { breadcrumb: 'System'}  },
  { path: 'psr/primary-roles',component:PrimaryRolesComponent,data:{breadcrumb: 'PSR Primary Roles'}},
  { path: 'psr/secondary-roles',component:SecondaryRolesComponent,data:{breadcrumb: 'PSR Secondary Roles'}},
  { path: 'psr/standard',component:StandardComponent,data:{breadcrumb: 'PSR Standard'}},
  { path: 'psr/manpower-induction',component:ManpowerInductionComponent,data:{breadcrumb: 'PSR Manpower Induction'}},
  { path: 'psr/acquisition-method',component:AcquisitionMethodComponent,data:{breadcrumb: 'PSR Acquisition Method'}},

  { path: 'psr/sss',component:SSSComponent,data:{breadcrumb: 'PSR SSS'}}, 
  { path: 'psr/sub-section',component:PSRSubSectionComponent,data:{breadcrumb: 'PSR Sub Section'}},
  { path: 'psr/section',component:PSRSectionComponent,data:{breadcrumb: 'PSR Section'}},



  { path: 'gls/document-sections',component:DocumentSectionsComponent,data:{breadcrumb: 'Document Sections'}},

   { path: 'gls/document-sub-sections',component:DocumentSubSectionsComponent,data:{breadcrumb: 'Document Sub Sections'}},
  
   { path: 'gls/document-sub-sections2',component:DocumentSubSections2Component,data:{breadcrumb: 'Document Sections2'}},

   { path: 'gls/annexures',component:AnnexuresComponent,data:{breadcrumb: 'Annexures'}},
    { path: 'designation',component:DesignationComponent,data:{breadcrumb: 'Designation Component'}},

    { path: 'psr/sss-mapping',component:SSSMappingComponent,data:{breadcrumb: 'SSS Mapping Component'}},


    { path: 'dockyard-group',component:DockyardGroupComponent,data:{breadcrumb: 'Dockyard Group'}},
    { path: 'time-keeping-attendance',component:TimeKeepingAttendanceComponent,data:{breadcrumb: 'Time Keeping Attendance'}},
    
    { path: 'man-power-booking',component:ManPowerBookingComponent,data:{breadcrumb: 'Manpower Booking'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
