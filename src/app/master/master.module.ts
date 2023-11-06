import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './master-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TrialunitsComponent } from './trialunits/trialunits.component';
import { SatelliteunitsComponent } from './satelliteunits/satelliteunits.component';
//import { ShipsComponent } from './ships/ships.component';
//import { SectionsComponent } from './sections/sections.component';
import { SectionComponent } from './section/section.component';
import { SubSectionComponent } from './sub_section/sub_section.component';

import { GlobalSectionComponent } from './global_section/global_section.component';
import { GlobalSubSectionComponent } from './global_sub_section/global_sub_section.component';
import { GlobalSubSubSectionComponent } from './global_sub_sub_section/global_sub_sub_section.component';
import { ModuleComponent } from './module/module.component';
import { SubModuleComponent } from './sub_module/sub_module.component';

import { TemplateComponent } from './template/template.component';
import { TemplateConfigComponent } from './template_config/template_config.component';
//import { TemplateGenerationComponent } from './template-generation/template-generation.component';

import { UnitTypeComponent } from './unit_type/unit_type.component';
import { UnitComponent } from './unit/unit.component';
import { AuthorityComponent } from './authority/authority.component';
import { ClassComponent } from './class/class.component';
import { DockyardComponent } from './dockyard/dockyard.component';
import { ShipComponent } from './ship/ship.component';
import { ShipsComponent } from './ships/ships.component';
import { CompartmentComponent } from './compartment/compartment.component';
import { SystemComponent } from './system/system.component';

import { EquipmentComponent } from './equipment/equipment.component';
import { StatusComponent } from './status/status.component';

import { TrialtypesComponent } from './trialtypes/trialtypes.component';
import { UsersComponent } from './users/users.component';
import { BoilerComponent } from './boiler/boiler.component';
import { CommandComponent } from './command/command.component';
import { DepartmentComponent } from './department/department.component';
//import { ProjectsComponent } from './projects/projects.component';
import { DefectListComponent } from './defect_list/defect_list.component';
//import { ProjectTypeComponent } from './project_type/project_type.component';
import { RefitTypeComponent } from './refit_type/refit_type.component';



import { PrimaryRolesComponent } from './psr/primary_role/primary-roles.component';
import { SecondaryRolesComponent } from './psr/secondary_roles/secondary-roles.component';
import { StandardComponent } from './psr/standard/standard.component';
import { ManpowerInductionComponent } from './psr/manpower_induction/manpower-induction.component';
import { AcquisitionMethodComponent } from './psr/acquisition_method/acquisition-method.component';
import { SSSComponent } from './psr/sss/sss.component';


import { PSRSectionComponent } from './psr/section/section.component';
import { PSRSubSectionComponent } from './psr/sub_section/sub_section.component';
import { DocumentSectionsComponent } from './gls/document_sections/document-sections.component';


import{ DocumentSubSectionsComponent } from './gls/document_sub_sections/document-sub-sections.component';
import{ DocumentSubSections2Component } from './gls/document_sub_sections2/document-sub-sections2.component';
import{ AnnexuresComponent } from "./gls/annexures/document-annexures.component";
import{ DesignationComponent } from './designation/designation.component';

import { SSSMappingComponent } from './sss-mapping/sss-mapping.component';
import { FormMappingComponent } from './form-mapping/form-mapping.component';


import { DockyardGroupComponent } from './dockyard_group/dockyard_group.component';
import { DockyardSubGroupComponent } from './dockyard_sub_group/dockyard_sub_group.component';
import { CenterComponent } from './center/center.component';
import { ShopFloorComponent } from './shop_floor/shop_floor.component';
import {  PayScaleComponent } from './pay_scale/pay_scale.component';
import {  CategoryTypeComponent } from './category_type/category_type.component';
import {  DemandMasterComponent } from './demand_master/demand_master.component';
import {  ItemsMasterComponent } from './items_master/items_master.component';
import {  DeductionsMasterComponent } from './deductions_master/deductions_master.component';
import {  AllowancesMasterComponent } from './allowances_master/allowances_master.component';
import {  PayGradeComponent } from './pay_grade/pay_grade.component';
import { PersonnelTypeComponent } from './personnel_type/personnel_type.component';
import { RankComponent } from './rank/rank.component';
import { StatusMasterComponent } from './status_master/status_master.component';
import { ItemTypeComponent } from './item_type/item_type.component';
import { StorageLocationComponent } from './storage_location/storage_location.component';
import { IssueComponent } from './issue/issue.component';
import { CourseComponent } from './course/course.component';
import { BatchComponent } from './batch/batch.component';

import { OverTimeComponent } from './over_time/over_time.component';
import { HolidayComponent } from './holiday/holiday.component';
import { StockRegisterComponent } from './stock_register/stock_register.component';
import { StockLogComponent } from './stock_log/stock_log.component';
import { NewDesignComponent } from './new_design/new_design.component';
import { StockCheckComponent } from './stock-check/stock-check.component';

import { PromotionComponent } from './promotion/promotion.component';
















import { TimeKeepingAttendanceComponent } from './time-keeping-attendance/time-keeping-attendance.component';
import { ManPowerBookingComponent } from './man-power-booking/man-power-booking.component';


@NgModule({
  declarations: [
    TrialunitsComponent,
    SatelliteunitsComponent,
    //ShipsComponent,
    //SectionsComponent,
    SectionComponent,
    SubSectionComponent,

    GlobalSectionComponent,
    GlobalSubSectionComponent,
    GlobalSubSubSectionComponent,

    ModuleComponent,
    SubModuleComponent,
    TemplateComponent,
    TemplateConfigComponent,
    //TemplateGenerationComponent,

    UnitTypeComponent,
    UnitComponent,
    AuthorityComponent,
    ClassComponent,
    DockyardComponent,
    ShipComponent,
    ShipsComponent,
    CompartmentComponent,
    SystemComponent,
    EquipmentComponent,
    StatusComponent,
    TrialtypesComponent,
    UsersComponent,
    BoilerComponent,
    CommandComponent,
    DepartmentComponent,
    DefectListComponent,
    RefitTypeComponent,
    PrimaryRolesComponent,
    SecondaryRolesComponent,
    StandardComponent,
    ManpowerInductionComponent,
    AcquisitionMethodComponent,
    SSSComponent,
    PSRSubSectionComponent,
    PSRSectionComponent,
    DocumentSectionsComponent,
    DocumentSubSectionsComponent,
    DocumentSubSections2Component,
    AnnexuresComponent,
    DesignationComponent,
    SSSMappingComponent,
    FormMappingComponent,
    PayScaleComponent,
    CategoryTypeComponent,
    DemandMasterComponent,
    ItemsMasterComponent,
    DeductionsMasterComponent,
    AllowancesMasterComponent,
    PayGradeComponent,
    PersonnelTypeComponent,
    RankComponent,
    StatusMasterComponent,
    ItemTypeComponent,
    StorageLocationComponent,
    IssueComponent,
    CourseComponent,
    BatchComponent,

    OverTimeComponent,
    HolidayComponent,
    StockRegisterComponent,
    StockLogComponent,
    NewDesignComponent,
    StockCheckComponent,



    DockyardGroupComponent,
    DockyardSubGroupComponent,
    CenterComponent,
    ShopFloorComponent,
    TimeKeepingAttendanceComponent,
    ManPowerBookingComponent,
    PromotionComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MastersRoutingModule
  ]
})
export class MasterModule { }
