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
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { of } from 'rxjs';
import { Params } from '@angular/router';
declare var moment:any;
declare var $;
declare var objectToParams:any;
declare function openModal(selector):any;
declare function closeModal(selector):any;

@Component({
  selector: 'app-document-generation',
  templateUrl: './document-generation.component.html',
  styleUrls: ['./document-generation.component.scss']
})
export class DocumentGenerationComponent implements OnInit {


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

  displayedColumns: string[] = [
    
    "project",
    "created_on",
    "freeze",
    "download",
    "pdfdownload",
    "edit",
    "view",
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

  constructor(public api: ApiService, private notification : NotificationService,
    private dialog:MatDialog, private router : Router, private elementref : ElementRef,private logger:ConsoleService) {

  }

  // public editForm = new FormGroup({
  //   id: new FormControl(""),
  //   name: new FormControl("", [
  //     Validators.required,
  //   ]),
  //   description: new FormControl(""),
  //   code: new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z0-9 ]+")]),
  //   created_by: new FormControl(""),
  //   created_ip: new FormControl(""),
  //   modified_by: new FormControl(""),
  //   sequence : new FormControl("", [Validators.pattern("^[0-9]*$")]),
  //   status: new FormControl("", [Validators.required]),
  // });
  //  status = this.editForm.value.status;

  public editForm = new FormGroup({
    id: new FormControl(""),
    project_id: new FormControl("", [Validators.required]),
    html: new FormControl("", [Validators.required]),
  });

  populate(data) {

    // this.editForm.patchValue(data);

    // this.editForm.patchValue({modified_by:this.api.userid.user_id});
    // this.logger.info(data.status)
    openModal('#crud-countries-view');
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
     this.getAuthority();
     this.getAccess();
  }

  getAuthority() {
    this.api
      //.getAPI(environment.API_URL + "transaction/global_transaction_edit_1")
      .getAPI(environment.API_URL + "transaction/global_transaction_download?module_id=3&approved_status=2&status=1")
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.countryList = res.data;
        this.dataSource.paginator = this.pagination;
        this.logger.log('country',this.countryList)
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

  // onView(country) {
  //   this.crudName = 'View';
  //   this.isReadonly=true;
  //   this.editForm.disable();
  //   this.populate(country);
  //   var element = <HTMLInputElement> document.getElementById("exampleCheck1");
  //   if(this.editForm.value.status == 1) {
  //    element.checked = true;
  //   }
  //   else {
  //    element.checked = false;
  //   }
  // }


  onView(country) {
    //console.log(country.module.id,country.project.id,country.form,"GGGGGGGGG")    
    console.log(country,"GGGGGGGGG")
    //return false;
    this.populate(country);
    this.fromGLS(country);
  }


  onFreeze(data){
    console.log(data,"freeze")

    let gt_id = data.id;
    let module_id = data.module.id;
    let form_id = data.form;
    let project_id = data.project.id;
    let created_by = this.api.userid.user_id;

    this.api.displayLoading(true)
    this.api
      .postAPI(environment.API_URL + "transaction/add-version",
        {
          gt_id:gt_id,
          module_id:1,
          form_id:form_id,
          project_id:project_id,
          created_by:created_by
        })
      .subscribe((res) => {
        this.api.displayLoading(false)
        //console.log(res.data, 'add-version')
        //this.completeGLS = res.data.slice(0,-2);
        //console.log(this.completeGLS,"GGGGGGg")


          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getAuthority();
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


completeGLS='';
  fromGLS(data){

    let module_id = data.module.id;
    let form_id = data.form;
    let project_id = data.project.id;

      this.api.displayLoading(true)
      this.api
        .postAPI(environment.API_URL + "transaction/get-all-psr",{module_id:module_id,form_id:form_id,project_id:project_id})
        .subscribe((res) => {
          this.api.displayLoading(false)
          this.completeGLS = res.data.slice(0,-2);

          console.log(this.completeGLS,"GGGGGGg")

        });
      }


downloadsection(country) {
  //   window.open(environment.API_URL + (module.report_url) + module.id, '_blank', 'location=no,height=' + window.screen.height + ',width=' + window.screen.width + ',scrollbars=yes,status=yes');
  // }
  // download(){
       // let data=objectToParams(country);
    window.open(environment.API_URL+'transaction/global_transaction_bls/report/'+country)

  }
  downloadpdf(country) {
  
    window.open(environment.API_URL+'transaction/global_transaction_blspdf/report/'+country)

  }

  pdfOption(country) {
      this.editForm.patchValue({project_id: country.project.id});
        this.api.displayLoading(true)
        this.api.getAPI(environment.API_URL + 'transaction/global_transaction_get_bls_pdf/report/'+country.id).subscribe((res)=>{
          this.api.displayLoading(false)
          if(res.status==environment.SUCCESS_CODE) {

            openModal('#crud-countries');
            this.editForm.patchValue({html: res.html});

          } else {

          }
        });
  }

  onDelete(id) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: language[environment.DEFAULT_LANG].confirmMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.api.postAPI(environment.API_URL + "master/authority/details", {
          id: id,
          status: 3,
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.notification.warn('Authority '+language[environment.DEFAULT_LANG].deleteMsg);
            this.getAuthority();
          } else {
            this.notification.displayMessage(language[environment.DEFAULT_LANG].unableDelete);
          }
        });
      }
      dialogRef=null;
    });
  }

  onSubmit() {
     if (this.editForm.valid) {
      let formVal = {
        ...this.editForm.value,
        ...{"form_id":9}
      }
      this.api
        .postAPI(
          environment.API_URL + "transaction/global_transaction_edit_pdf/report",
          formVal
        )
        .subscribe((res) => {
          //this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE){

            window.open(environment.API_URL+'transaction/global_transaction_gen_edit_pdf/report')

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
      this.getAuthority();
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

