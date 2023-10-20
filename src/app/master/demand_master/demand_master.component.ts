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
  selector: 'app-demand_master',
  templateUrl: './demand_master.component.html',
  styleUrls: ['./demand_master.component.scss']
})
export class DemandMasterComponent implements OnInit {


 displayedColumns: string[] = [
    "qty",
    "code",
    // "demand_date",
  
    "status",
    "view",
    "edit",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;

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
    qty: new FormControl("", [
      Validators.required,
    ]),
   
    demand_date: new FormControl("moment().format('MM/DD/yyyy')"),
    center_no: new FormControl("",[Validators.required]),
    wi_number: new FormControl("",[Validators.required]),
    code: new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z0-9 ]+")]),
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
     this.getDemandMaster();
     this.getAccess();
     this.getCenter();
     this.getWI();
  }
  centers:any;
  getCenter() {
    this.api
      .getAPI(environment.API_URL + "master/center?status=1")
      .subscribe((res) => {
        this.centers = res.data;
        console.log("centersssss",this.centers)
      });
  }
  wis:any
  getWI(){
    this.api
      .getAPI(environment.API_URL + "transaction/wi?status=1")
      .subscribe((res) => {
        this.wis = res.data;
        console.log("workinstructionnnn",this.wis)
      });

  }
  demandmaster:any
  getDemandMaster() {
    this.api
      .getAPI(environment.API_URL + "master/demand_master")
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.demandmaster = res.data;
        this.dataSource.paginator = this.pagination;
        this.logger.log('demanmsater',this.demandmaster)
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
        this.api.postAPI(environment.API_URL + "master/demand_master/details", {
          id: id,
          status: 3,
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.notification.warn('DemandMaster '+language[environment.DEFAULT_LANG].deleteMsg);
            this.getDemandMaster();
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
          environment.API_URL + "master/demand_master/details",
          this.editForm.value
        )
        .subscribe((res) => {
          this.logger.log('response',res);
          //this.error= res.status;
          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getDemandMaster();
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
      this.getDemandMaster();
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
