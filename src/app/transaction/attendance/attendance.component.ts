import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { NotificationService } from "src/app/service/notification.service";
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { language } from "src/environments/language";
import { Router,ActivatedRoute } from '@angular/router';
import { ConsoleService } from "src/app/service/console.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { formatDate } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';

import { of } from 'rxjs';
//import { Console } from 'console';
declare var arrayColumn;
declare var moment:any;
declare function openModal(selector):any;
declare function closeModal(selector):any;
declare function formSubmit(selector):any;
declare function triggerClick(selector):any;

export interface PeriodicElement {
  name: string;
  //position: number;
  remarks: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
];


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('localform')localform:HTMLFormElement;
  attDate:any;

  selected:any = '18'
    displayedColumns: string[] = ['name', 'remarks', 'actions'];
    dataSource2 = ELEMENT_DATA;

   active = 1;

   editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter remarks here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize','toggleEditorMode','customClasses']
    ]
};

  displayedColumnsPending: string[] = [
    "center",
    "employee",
    "attendance_date",
    "attendance_status",
    "check_in",
    "check_out",
    "view",
    "edit",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;
  dataSourceApproved: MatTableDataSource<any>;
  dataSourcePending: MatTableDataSource<any>;

  initiation: any;
  public crudName = "Add";
  public initiationList = [];
  public dataListApproved = [];
  public dataListPending = [];
  public documentList = [];
  //public projectid=[];
  projectid:any;
  UserList = [];
  filterValue:any;
  isReadonly=false;
  moduleAccess:any;
  ErrorMsg:any;
  error_msg=false;
  moment=moment;
  allSelected = false;
  allSelectedsecondary=false;
  environment=environment;
  showError = false;



  public permission={
    add:false,
    edit:false,
    view:false,
    delete:false,
    recommend:false,
    approve:false,
    print:false,
  };
  @ViewChild('select') select: MatSelect;
  @ViewChild('select2') select2: MatSelect;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild('paginationApproved') paginationApproved: MatPaginator;
  @ViewChild('paginationPending') paginationPending: MatPaginator;
  @ViewChild("closebutton") closebutton;
  @ViewChild("closebuttonproject") closebuttonproject;
  @ViewChild("closebuttonapproval") closebuttonapproval;
  @ViewChild("closebutton_email") closebutton_email;
  @ViewChild("closebutton_excel") closebutton_excel;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild("mySel") skillSel: MatSelect;

  currentDate = new Date();
  constructor(public api: ApiService, private notification : NotificationService,
    private dialog:MatDialog, private router : Router, private elementref : ElementRef,private logger:ConsoleService,public aroute: ActivatedRoute) {
  }


  public editForm = new FormGroup({
    id: new FormControl(""),
    user: new FormControl("",[Validators.required]),
    center: new FormControl("",[Validators.required]),
    attendance_date: new FormControl("moment().format('MM/DD/yyyy')"),
    check_in: new FormControl(""),
    check_out: new FormControl(""),    
    attendance_status: new FormControl(""),
    //status: new FormControl(""),
  });


  primaryRole: any
  secondaryRole: any
  onPrimaryRoles()
  {
    console.log('this.editForm',this.editForm);
  }
  
  populate(data) {
    console.log(data,"data");
    this.editForm.patchValue(data);
    this.logger.info(data.status)
  }

  initForm() {
    this.editForm.patchValue({
      status: "1",
      primary_role: "",
    });
  }
  selectedTrial:any;
  openCurrentStatus(trial){
    this.selectedTrial=trial;
    openModal('#trial-status-modal');
  }


  Error = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName]?this.editForm.controls[controlName].hasError(errorName):false;
  };


  isEquipment=true;
  isBoiler=false;
  modeSelect:any;


  ngOnInit(): void {
   this.getListing();
   this.getCenter();
   this.getEmployee();
   this.getAccess();
   //var element = <HTMLInputElement>document.getElementById("exampleCheck1");
   //element.checked = true;
  }
  public FinalArray = [];
  projects=[];

  getListing() {
    this.api
      .getAPI(environment.API_URL + "transaction/attendance")
      .subscribe((res) => {
        this.dataSourcePending = new MatTableDataSource(res.data);
        //this.initiationList = res.data;
        this.dataListPending = res.data;
        this.dataSourcePending.paginator = this.paginationPending;
        this.logger.log('Attendance',res.data)
      });
   } 


  applyFilterPending(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    if(this.filterValue){
      this.dataSourcePending.filter = this.filterValue.trim().toLowerCase();
    } else {
      this.getListing();
    }
  }

  create() {
    this.crudName = "Add";
    this.isReadonly=false;
    this.editForm.enable();
    let reset = this.formGroupDirective.resetForm();
    if(reset!==null) {
      this.initForm();
    }
    // var element = <HTMLInputElement>document.getElementById("");
    // element.checked = true;
  }

  pro:any;
  editOption(initiation) {
    this.pro=true;
    this.isReadonly=false;

    this.editForm.enable();

    //this.editForm.project.disable();
    this.crudName = "Submit";
    this.logger.info(initiation);

    this.populate(initiation);
    var element = <HTMLInputElement>document.getElementById("exampleCheck1");
    if (this.editForm.value.status == "1") {
      element.checked = true;
    }
    else {
      element.checked = false;
    }

  }

  viewTrial:any;
  onView(initiation) {
    this.crudName = 'View';
    this.viewTrial=initiation;
    this.isReadonly=true;
    this.editForm.disable();
    this.populate(initiation);
    this.editorConfig.editable= false;

  }

  onDelete(data) {

    //console.log(data)
    //return false;
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: language[environment.DEFAULT_LANG].confirmMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.api.postAPI(environment.API_URL + "transaction/attendance", {
          id: data.id,
          user: data.user,
          status: 3
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.getListing();
            this.notification.warn('Attendance '+language[environment.DEFAULT_LANG].deleteMsg);

          } else {
            this.notification.displayMessage(language[environment.DEFAULT_LANG].unableDelete);
          }
        });
      }
      dialogRef=null;
    });
  }

  onSubmit() {
    console.log('fsdf')

    this.showError = true;
     if (this.editForm.valid) {

      console.log(this.editForm.value,"this.editForm")
      //return false;
      console.log('fsdfvalid')

      //this.editForm.value.DartDate = moment(this.editForm.value.DartDate, "YYYY-MM-DD").format("YYYY-MM-DD");

      // this.editForm.value.conclusion_of_contract = moment(this.editForm.value.conclusion_of_contract, "YYYY-MM-DD").format("YYYY-MM-DD");

      // this.editForm.value.induction = moment(this.editForm.value.induction, "YYYY-MM-DD").format("YYYY-MM-DD");
      this.editForm.value.created_by = this.api.userid.user_id;
      //this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
      this.editForm.value.status = 1;
      // if(this.editForm.value.project !=null){
      //   this.editForm.value.project = this.editForm.value.project
      //   }
      //this.editForm.value.approved_status = '';

      //console.log(this.editForm.value);
      //return false;
      this.api
        .postAPI(
          environment.API_URL + "transaction/attendance/crud",
          this.editForm.value
        )
        .subscribe((res) => {
          this.logger.log('response',res);
          //alert(res.status)
          //this.error= res.status;
          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getListing();
            this.closebutton.nativeElement.click();
            //res.data['type']='edit';
            //localStorage.setItem('trial_form',this.api.encryptData(res.data));
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


  centers:any;
  getCenter() {
    this.api
      .getAPI(environment.API_URL + "master/center?status=1")
      .subscribe((res) => {
        this.centers = res.data;
        console.log(this.centers,"center")
      });
  }

  employees:any;
  getEmployee() {
    this.api
      .getAPI(environment.API_URL + "api/auth/users?status=1")
      .subscribe((res) => {
        this.employees = res.data;
        console.log(this.employees,"employees")
      });
  }

  trialPage:any;
  getAccess() {
    this.moduleAccess=this.api.getPageAction();
    if(this.moduleAccess)
    {
      let addPermission=(this.moduleAccess).filter(function(access){ if(access.code=='INI') return access.status; }).map(function(obj) {return obj.status;});
      let editPermission=(this.moduleAccess).filter(function(access){ if(access.code=='EDIT') { return access.status;} }).map(function(obj) {return obj.status;});
      let viewPermission=(this.moduleAccess).filter(function(access){ if(access.code=='VIW') { return access.status;} }).map(function(obj) {return obj.status;});
      let deletePermission=(this.moduleAccess).filter(function(access){ if(access.code=='DEL') { return access.status;} }).map(function(obj) {return obj.status;});
      let recommendPermission=(this.moduleAccess).filter(function(access){ if(access.code=='REC') { return access.status;} }).map(function(obj) {return obj.status;});
      let approvePermission=(this.moduleAccess).filter(function(access){ if(access.code=='APR') { return access.status;} }).map(function(obj) {return obj.status;});
      let printPermission=(this.moduleAccess).filter(function(access){ if(access.code=='PRI') { return access.status;} }).map(function(obj) {return obj.status;});
      this.permission.add=addPermission.length>0?addPermission[0]:false;
      this.permission.edit=editPermission.length>0?editPermission[0]:false;
      this.permission.view=viewPermission.length>0?viewPermission[0]:false;
      this.permission.delete=deletePermission.length>0?deletePermission[0]:false;
      this.permission.recommend=recommendPermission.length>0?recommendPermission[0]:false;
      this.permission.approve=approvePermission.length>0?approvePermission[0]:false;
      this.permission.print=printPermission.length>0?printPermission[0]:false;
    }

    this.logger.log('this.permission',this.permission);
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  toggleAllSelectionSecondary() {
    if (this.allSelectedsecondary) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClickSecondary() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedsecondary = newStatus;
  }
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value)
      } else {
        console.log(event.source.value)
      }
    }
  }


  disableDate(){
    return false;
  }
// allSelected = false;


  //category = new FormControl();
  add(){
    this.crudName = "Add";
    this.isReadonly=false;
    this.editForm.enable();
    //this.getProject("add");
    this.editForm.reset();
    let reset = this.formGroupDirective.resetForm();
      if(reset!==null) {
        this.initForm();
      }
  }

  onclose(){
    this.FinalArray=[];
    let reset = this.formGroupDirective.resetForm();
    if(reset!==null) {
      this.initForm();
    }
    this.editForm.reset();
    //this.editFormDocument.reset;
    this.pro=true;

  }

  // number input only
numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}




  /** Import **/

  public editFormImport = new FormGroup({
    file_name: new FormControl("", [Validators.required]),
    created_by: new FormControl("")
  });

  clearEditFormImport() {
    this.editFormImport.reset({
      'file_name': '',
      'type_name': ''
    });
  }

  onSubmitImport() {
    this.showError = true;
    if (this.editFormImport.valid) {

    const formData = new FormData();
    formData.append('excel_file_upload', this.fileToUpload);
    formData.append('created_by', this.api.userid.user_id);
    this.api
      .postAPI(
        environment.API_URL + "transaction/ra/excel",
        formData
      )
      .subscribe((res) => {
        this.logger.log('response', res);
        //alert(res.status)
        //this.error= res.status;
        if (res.status == environment.SUCCESS_CODE) {
          this.showError = false;
          // this.logger.log('Formvalue',this.editForm.value);
          this.clearEditFormImport()
          //formData.append('user_import', '');
          this.editFormImport.get('file_name').reset();
          this.editFormImport.controls['file_name'].reset();
          this.notification.success(res.message);

          this.closebutton_excel.nativeElement.click();
          this.getListing();
          //res.data['type']='edit';

          //localStorage.setItem('trial_form',this.api.encryptData(res.data));
        } else if (res.status == environment.ERROR_CODE) {
         
          this.error_msg = true;
          this.ErrorMsg = res.message;
          setTimeout(() => {
            this.error_msg = false;
          }, 2000);
        } else {
          this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
        }

      });
  }
  }

  onClose() {
    this.showError=false;
    this.editFormImport.controls['file_name'].reset();
  }

  fileToUpload: File | null = null;
  onFileHandler(event) {
    console.log(event, event.target.files[0])
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    };
  }

  downloadFile(){
      let url = environment.API_URL+'/media/Excel/sample/ra.xlsx';
      window.location.href = url;
   }

  /*** QC ****/
  public editFormQC = new FormGroup({
    id: new FormControl("", [Validators.required]),
    qc_status: new FormControl("", [Validators.required]),
    remarks: new FormControl("",[Validators.required]),
  });

  QC(initiation) {

    console.log('@@@@@',initiation);
    this.editFormQC.patchValue({
      id: initiation.id
    });

  }

  onSubmitQC() {

    console.log(this.editFormQC.value)
    //return false;

    if (this.editFormQC.valid) {
      this.api
      .postAPI(
        environment.API_URL + "transaction/job-card/qc/crud",
        this.editFormQC.value
      )
      .subscribe((res) => {
        this.logger.log('response',res);
        if(res.status==environment.SUCCESS_CODE){
          this.notification.success(res.message);
          this.getListing();
          this.notification.warn('QC added successfully');
          this.closebuttonapproval.nativeElement.click();
          //this.getListing();
          //this.closebutton.nativeElement.click();
          //res.data['type']='edit';
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


  QCclose(){
   this.editFormQC.reset();
  }

  // **** History *****//

  qcHistory: any;
  openQCStatus(country){
    console.log(country,"HHH")

    this.api.postAPI(environment.API_URL + "transaction/job-card/qc", {
      job_card_id: country,
    }).subscribe((res) => {
     this.qcHistory = res.data;

     console.log(this.qcHistory,"qcHistory")
    })

    //openModal('#transaction-status-modal');
  }


  onCheckInOut(country, type){

    this.api.postAPI(environment.API_URL + "transaction/attendance/check_in_out", {
      attendance_id: country,
      check_type: type
    }).subscribe((res) => {

        if(res.status==environment.SUCCESS_CODE){
          this.notification.success(res.message);
          this.getListing();
        } else if(res.status==environment.ERROR_CODE) {
          this.error_msg=true;
          this.ErrorMsg=res.message;
          setTimeout(()=> {
            this.error_msg = false;
         }, 2000);
        } else {
          this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
        }

    })


  }


}