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
import { DatePipe } from '@angular/common';

import { ConsoleService } from "src/app/service/console.service";
import { Router,ActivatedRoute } from '@angular/router';


import { of } from 'rxjs';
import { AngularEditorConfig } from "@kolkov/angular-editor/lib/config";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
declare var $;
declare var arrayColumn;
declare var moment:any;
declare function openModal(selector):any;
declare function closeModal(selector):any;
declare function formSubmit(selector):any;
declare function triggerClick(selector):any;

@Component({
  selector: 'app-monthly_salary',
  templateUrl: './monthly_salary.component.html',
  styleUrls: ['./monthly_salary.component.scss']
})
export class MonthlySalaryComponent implements OnInit {


 displayedColumns: string[] = [
    "employee",
    "total_credits",
    "total_debits",
  
    "status",
    "view",
    "edit",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;
  public formattedDate: string;

  country: any;
  public crudName = "Add";
  public countryList = [];
  filterValue:any;
  isReadonly=false;
  moduleAccess:any;
  ErrorMsg:any;
  error_msg=false;

  public permission={
    add:false,
    edit:false,
    view:false,
    delete:false,
  };

  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild("closebutton") closebutton;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(public api: ApiService, private notification : NotificationService,
    private dialog:MatDialog, private router : Router, private elementref : ElementRef,private logger:ConsoleService) {

  }

  public editForm = new FormGroup({
    id: new FormControl(""),
    user: new FormControl("", [
      Validators.required,
    ]),
   
    for_month: new FormControl("moment().format('YYYY-MM-DD')"),
    total_credits: new FormControl("",[Validators.required]),
    total_debits: new FormControl("",[Validators.required]),
    gross_salary: new FormControl("",[Validators.required]),
    net_salary: new FormControl("", [Validators.required,]),
    created_by: new FormControl(""),
    created_ip: new FormControl(""),
    modified_by: new FormControl(""),
    sequence : new FormControl("", [Validators.pattern("^[0-9]*$")]),
    status: new FormControl("", [Validators.required]),
  });
   status = this.editForm.value.status;
  populate(data) {

    this.editForm.patchValue(data);
    //this.editForm.patchValue({section_id:data.section_id.id});
    this.editForm.patchValue({modified_by:this.api.userid.user_id});
    this.logger.info(data.status)
  }

  initForm() {
    this.editForm.patchValue({
      status: "1",
    });
  }

  Error = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
     this.getMonthlySalary();
     this.getAccess();
     this.getUsers();
     this.formatDate(new Date());
     
  }
  // users:any;
  // getUsers() {
  //   this.api
  //     .getAPI(environment.API_URL + "master/center?status=1")
  //     .subscribe((res) => {
  //       this.users = res.data;
  //       console.log("userssssss",this.users)
  //     });
  // }


  users=[];
  getUsers() {
    this.api
      .postAPI(environment.API_URL + "api/auth/user/get_all_user",{})
      .subscribe((res) => {
        this.users = res.data;
        console.log(this.users,"userrrr")
      });
  }
  
  monthlysalary:any
  getMonthlySalary() {
    this.api
      .getAPI(environment.API_URL + "transaction/monthly_salary")
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.monthlysalary = res.data;
        this.dataSource.paginator = this.pagination;
        this.logger.log('monthlysalary',this.monthlysalary)
      });
  }

  create() {
    this.crudName = "Add";
    this.isReadonly=false;
    this.editForm.enable();
    let reset = this.formGroupDirective.resetForm();
    if(reset!==null) {
      this.initForm();
    }
    var element = <HTMLInputElement>document.getElementById("exampleCheck1");
    element.checked = true;
  }

  editOption(country) {
    this.isReadonly=false;
    this.editForm.enable();
    this.crudName = "Edit";
    this.logger.info(country);
    this.populate(country);
    var element = <HTMLInputElement> document.getElementById("exampleCheck1");
    if(this.editForm.value.status == 1) {
     element.checked = true;
    }
    else {
     element.checked = false;
    }
  }

  onView(country) {
    this.crudName = 'View';
    this.isReadonly=true;
    this.editForm.disable();
    this.populate(country);
    var element = <HTMLInputElement> document.getElementById("exampleCheck1");
    if(this.editForm.value.status == 1) {
     element.checked = true;
    }
    else {
     element.checked = false;
    }
  }

  onDelete(id) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: language[environment.DEFAULT_LANG].confirmMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.api.postAPI(environment.API_URL + "transaction/monthly_salary/crud", {
          id: id,
          status: 3,
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.notification.warn('DemandMaster '+language[environment.DEFAULT_LANG].deleteMsg);
            this.getMonthlySalary();
          } else {
            this.notification.displayMessage(language[environment.DEFAULT_LANG].unableDelete);
          }
        });
      }
      dialogRef=null;
    });
  }
  // getCategoryType() {
  //   throw new Error("Method not implemented.");
  // }

  onSubmit() {
     if (this.editForm.valid) {
      this.editForm.value.created_by = this.api.userid.user_id;
      this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
      this.api
        .postAPI(
          environment.API_URL + "transaction/monthly_salary/crud",
          this.editForm.value
        )
        .subscribe((res) => {
          this.logger.log('response',res);
          //this.error= res.status;
          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getMonthlySalary();
            this.closebutton.nativeElement.click();
          } else if(res.status==environment.ERROR_CODE) {
            this.error_msg=true;
            this.ErrorMsg=res.message;
            setTimeout(()=> {
              this.error_msg = false;
           }, 2000);
          } else {
            this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
          }

        });
    }
  }
  formatDate(date: Date) {
    const datePipe = new DatePipe('en-US');
    this.formattedDate = datePipe.transform(date, 'yyyy-MM-dd');
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
      this.getMonthlySalary();
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

}
