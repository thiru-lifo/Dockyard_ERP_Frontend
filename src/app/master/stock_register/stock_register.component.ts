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
declare var arrayColumn;
declare var moment:any;
declare function openModal(selector):any;
declare function closeModal(selector):any;
declare function formSubmit(selector):any;
declare function triggerClick(selector):any;

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
  {name: 'test', remarks: 'test', actions: 'test'},
];

export interface PeriodicElement {
  name: string;
  //position: number;
  remarks: string;
  actions: string;
}

@Component({
  selector: 'app-stock_register',
  templateUrl: './stock_register.component.html',
  styleUrls: ['./stock_register.component.scss']
})
export class StockRegisterComponent implements OnInit {

//   forMonthDate:any;

//   selected:any = '18'
//     displayedColumns: string[] = ['name', 'remarks', 'actions'];
//     dataSource2 = ELEMENT_DATA;

//    active = 1;

//    editorConfig: AngularEditorConfig = {
//     editable: true,
//       spellcheck: true,
//       height: 'auto',
//       minHeight: '0',
//       maxHeight: 'auto',
//       width: 'auto',
//       minWidth: '0',
//       translate: 'yes',
//       enableToolbar: true,
//       showToolbar: true,
//       placeholder: 'Enter remarks here...',
//       defaultParagraphSeparator: '',
//       defaultFontName: '',
//       defaultFontSize: '',
//       fonts: [
//         {class: 'arial', name: 'Arial'},
//         {class: 'times-new-roman', name: 'Times New Roman'},
//         {class: 'calibri', name: 'Calibri'},
//         {class: 'comic-sans-ms', name: 'Comic Sans MS'}
//       ],
//       customClasses: [
//       {
//         name: 'quote',
//         class: 'quote',
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: 'titleText',
//         class: 'titleText',
//         tag: 'h1',
//       },
//     ],
//     uploadWithCredentials: false,
//     sanitize: false,
//     toolbarPosition: 'top',
//     toolbarHiddenButtons: [
//       ['bold', 'italic'],
//       ['fontSize','toggleEditorMode','customClasses']
//     ]
// };

  displayedColumns: string[] = [
    
    "name",
    "stock_qty",
    "last_updt_on",
   
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
  moment =moment;

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
    code: new FormControl("", [Validators.required]),
    last_updt_on: new FormControl("moment().format('MM/DD/yyyy')"),
    unit_cost : new FormControl("", [Validators.pattern("^[0-9]*$")]),
    name: new FormControl("", [
      Validators.required,
    ]),
    stock_qty: new FormControl("", [Validators.required,]),
    batch: new FormControl("", [Validators.required,]),
    storage_location: new FormControl("", [Validators.required,]),
    available_qty: new FormControl("", [Validators.required,]),
    created_by: new FormControl(""),
    created_ip: new FormControl(""),
    modified_by: new FormControl(""),
    sequence : new FormControl("", [Validators.pattern("^[0-9]*$")]),
    status: new FormControl("", [Validators.required]),
  });
   status = this.editForm.value.status;
  populate(data) {

    this.editForm.patchValue(data);
    //this.editForm.patchValue({project_id:data.project_id.id});
    //this.editForm.patchValue({trial_unit:data.trial_unit.id});
    /*this.getCommand(data.trial_unit.id);
    this.getSatelliteUnits(data.trial_unit.id,data.command.id);
    this.getShips(data.trial_unit.id,data.satellite_unit.id);
    setTimeout(()=>{
      this.editForm.patchValue({satellite_unit:data.satellite_unit.id});
      this.editForm.patchValue({command:data.command?data.command.id:''});
      this.editForm.patchValue({ship:data.ship.id});
    },500);*/
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
     this.getBatch();
     
     this.getStoragelocation();
     this.getAccess();
     this.getStockRegister();
     this.getCode();
  }


batchs:any;
  getBatch() {
    this.api
      .getAPI(environment.API_URL + "master/batch?status=1")
      .subscribe((res) => {
        this.batchs = res.data;
        console.log("batch id",this.batchs)
      });
  }

  storagelocations:any;
  getStoragelocation() {
    this.api
      .getAPI(environment.API_URL + "master/storage_location?status=1")
      .subscribe((res) => {
        this.storagelocations = res.data;
        console.log("storagelocation",this.storagelocations)
      });
  }

 codes:any;
  getCode() {
    this.api
      .getAPI(environment.API_URL + "master/items_master?status=1")
      .subscribe((res) => {
        this.codes = res.data;
        console.log("codes",this.codes)
      });
  }






  
stockregisters:any
  getStockRegister() {
    this.api
      .getAPI(environment.API_URL + "master/stock_register")
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.stockregisters = res.data;
        this.dataSource.paginator = this.pagination;
        this.logger.log('stockregisters',this.stockregisters)
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
        this.api.postAPI(environment.API_URL + "master/stock_register/details", {
          id: id,
          status: 3,
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.notification.warn('Stock Register '+language[environment.DEFAULT_LANG].deleteMsg);
            this.getStoragelocation();
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
      this.editForm.value.created_by = this.api.userid.user_id;
      this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
      this.api
        .postAPI(
          environment.API_URL + "master/stock_register/details",
          this.editForm.value
        )
        .subscribe((res) => {
          this.logger.log('response',res);
          //this.error= res.status;
          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getStoragelocation();
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
      this.getStoragelocation();
    }
  }
  disableDate(){
    return false;
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

