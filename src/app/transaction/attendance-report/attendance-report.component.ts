import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { NotificationService } from "src/app/service/notification.service";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { language } from "src/environments/language";
import { Router } from '@angular/router';
import { ConsoleService } from "src/app/service/console.service";
import { of } from 'rxjs';

declare var moment:any;

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {


  displayedColumns: string[] = [
    "employee",
    "date",
    "check_in",
    "check_out",
    "status",
    "center"
  ];

  dataSource: MatTableDataSource<any>;

  country: any;
  startDate:any;
  endDate:any;
  public crudName = "Add";
  public countryList = [];
  filterValue:any;
  isReadonly=false;
  moduleAccess:any;
  ErrorMsg:any;
  error_msg=false;
  moment=moment;


  public permission={
    add:false,
    edit:false,
    view:false,
    delete:false,
  };

  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild("closebutton") closebutton;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild('localForm') localForm:HTMLFormElement; 

  constructor(public api: ApiService, private notification : NotificationService,
    private dialog:MatDialog, private router : Router, private elementref : ElementRef,private logger:ConsoleService) {

  }

  
  populate(data) {

    this.logger.info(data.status)
  }

  initForm() {

  }

  Error = (controlName: string, errorName: string) => {
    //return this.editForm.controls[controlName].hasError(errorName);
  };

  // Error = (controlName: string, errorName: string) => {
  //   return this.searchForm.controls[controlName].hasError(errorName);
  // };

  ngOnInit(): void {
     //this.getAttendance()
  }

  

  editOption(country) {
    this.isReadonly=false;
    //this.editForm.enable();
    this.crudName = "Edit";
    this.logger.info(country);
    //this.populate(country);
    var element = <HTMLInputElement> document.getElementById("exampleCheck1");
    
  }

  onView(country) {
    this.crudName = 'View';
    this.isReadonly=true;
    //this.editForm.disable();
    this.populate(country);
    var element = <HTMLInputElement> document.getElementById("exampleCheck1");
    
  }

  getAccess() {
    this.moduleAccess=this.api.getPageAction();
    if(this.moduleAccess)
    {
      let addPermission=(this.moduleAccess).filter(function(access){ if(access.code=='ADD') return access.status; }).map(function(obj) {return obj.status;});
      let editPermission=(this.moduleAccess).filter(function(access){ if(access.code=='EDIT') { return access.status;} }).map(function(obj) {return obj.status;});;
      let viewPermission=(this.moduleAccess).filter(function(access){ if(access.code=='VIW') { return access.status;} }).map(function(obj) {return obj.status;});;
      let deletePermission=(this.moduleAccess).filter(function(access){ if(access.code=='DEL') { return access.status;} }).map(function(obj) {return obj.status;});;
      this.permission.add=addPermission.length>0?addPermission[0]:false;
      this.permission.edit=editPermission.length>0?editPermission[0]:false;;
      this.permission.view=viewPermission.length>0?viewPermission[0]:false;;
      this.permission.delete=deletePermission.length>0?deletePermission[0]:false;;
    }

    this.logger.log('this.permission',this.permission);
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    if(this.filterValue){
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    } else {
      //this.getCompartment();
      this.getAttendance();
    }
  }
  numberOnly(event:any): boolean {
    var key = event.keyCode;
          if (key > 31 && (key < 65 || key > 90) &&
              (key < 97 || key > 122)) {
          return false;
        }
        return true;
  
      }
sectionF:any;
getSectionF() {
    this.api
      .getAPI(environment.API_URL + "master/global_section?status=1&order_type=asc")
      .subscribe((res) => {
        this.sectionF = res.data;

      });
  }
   subSectionF:any;
  getSubSectionF(global_section_id='') {

    let filter='?status=1&order_type=asc';
    filter+=global_section_id?'&global_section_id='+global_section_id:'';
    //alert(filter)
    this.api
      .getAPI(environment.API_URL + "master/global_sub_section"+filter)
      .subscribe((res) => {
        this.subSectionF = res.data;

        
      });
  }
   subsubSectionF:any;
  getSubSubSectionF(global_section_id='', global_sub_section_id='') {

    let filter='?status=1&order_type=asc';
    filter+=global_section_id?'&global_section_id='+global_section_id+'&global_sub_section_id='+global_sub_section_id:'';
    //alert(filter)
    this.api
      .getAPI(environment.API_URL + "master/global_sub_sub_section"+filter)
      .subscribe((res) => {
        this.subsubSectionF = res.data;

        
      });
  }

start_date = new FormControl(new Date());
 //start_date = new FormControl(new Date().toISOString());

searchForm= new FormGroup({
    start_date:new FormControl(new Date(), Validators.required),
    end_date:new FormControl("", [Validators.required]),
    //subsubsection:new FormControl("")
  })


  // param:any;
  // search(){
  
  // let type=this.searchForm.value.section?"&global_section="+this.searchForm.value.section:"";
  // type+=this.searchForm.value.subsection?"&global_sub_section="+this.searchForm.value.subsection:"";
  // type+=this.searchForm.value.subsubsection?"&global_sub_sub_section="+this.searchForm.value.subsubsection:"";
  // this.param=type;
  //   this.getCompartment();
  // }

 clear(){
    this.searchForm.reset();
    //this.param="";
    this.getAttendance();
  }
 close(){
    //this.editForm.reset();
  }


  disableDate(){
    return false;
  }


  param:any;
  search(){
    this.getAttendance();
  }


  getAttendance(){

    if (this.searchForm.valid) {
      this.searchForm.value.start_date = this.searchForm.value.start_date ? moment(this.searchForm.value.start_date, "YYYY-MM-DD").format("YYYY-MM-DD") : '0000-00-00';
      this.searchForm.value.end_date = this.searchForm.value.end_date ? moment(this.searchForm.value.end_date, "YYYY-MM-DD").format("YYYY-MM-DD") : '0000-00-00';
      this.api
        .postAPI(environment.API_URL + "transaction/attendance/report", this.searchForm.value)
        .subscribe((res) => {



          // if(res.status==environment.SUCCESS_CODE){
          //   this.dataSource = new MatTableDataSource(res.data);
          //   this.countryList = res.data;
          //   this.dataSource.paginator = this.pagination;
          //   this.logger.log('country',this.countryList)
          // } else if(res.status==2) {
          //   this.error_msg=true;
          //   this.ErrorMsg=res.message;
          //   setTimeout(()=> {
          //     this.error_msg = false;
          //  }, 2000);
          // } else {
          //   this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
          // }


          this.dataSource = new MatTableDataSource(res.data);
          this.countryList = res.data;
          this.dataSource.paginator = this.pagination;
          this.logger.log('country',this.countryList)
        });
      }
  }


}

