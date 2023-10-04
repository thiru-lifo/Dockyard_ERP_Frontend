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
@Component({
  selector: 'app-ships',
  templateUrl: './defect_list.component.html',
  styleUrls: ['./defect_list.component.scss']
})
export class DefectListComponent implements OnInit {


  displayedColumns: string[] = [
    //"trial_unit",
    //"command",
    //"satellite_unit",
    //'class_id',
    'refit_type',
    "name",
    "code",
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
  filterValue1:any;
  isReadonly=false;
  moduleAccess:any;
  ErrorMsg:any;
  error_msg=false;
  showError = false;


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
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    code: new FormControl("", [Validators.required]),
    //class_id: new FormControl("", [Validators.required]),
    refit_type: new FormControl("", [Validators.required]),

    dl_1: new FormControl(""),
    dl_2: new FormControl(""),
    dl_3: new FormControl(""),
    sdl: new FormControl(""),
    awrf_1: new FormControl(""),
    awrf_2: new FormControl(""),
    awrf_3: new FormControl(""),

    created_by: new FormControl(""),
    created_ip: new FormControl(""),
    modified_by: new FormControl(""),
    sequence : new FormControl("", [Validators.pattern("^[0-9]*$")]),
    status: new FormControl(""),
  });
   //status = this.editForm.value.status;
  populate(data) {
    console.log(data,"data");

    this.editForm.patchValue(data);
    //this.editForm.patchValue({class_id:data.class_id.id});
    //this.getCommand(data.trial_unit.id);
    //this.getSatelliteUnits(data.trial_unit.id,data.command.id);

    setTimeout(()=>{
      // this.editForm.patchValue({satellite_unit:data.satellite_unit?data.satellite_unit.id:''});
      //this.editForm.patchValue({command:data.command?data.command.id:''});
    },500);

    //this.editForm.patchValue({satellite_unit:data.class_id.id});
    this.editForm.patchValue({modified_by:this.api.userid.user_id});
    this.logger.info(data.status)
    console.log('dsd',data.status)
  }

  initForm() {
    this.editForm.patchValue({
      status: "1",
    });
  }

  displaySatelliteUnit(units)
  {
    let satelliteUnits='';
    for(let i=0;i<units.length;i++)
      satelliteUnits+=units[i].satellite_unit.name+' & ';

    return satelliteUnits.substring(0,(satelliteUnits.length)-3);
  }

  Error = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName].hasError(errorName);
  };

  Error1 = (controlName: string, errorName: string) => {
    return this.editFormImport.controls[controlName] ? this.editFormImport.controls[controlName].hasError(errorName) : false;
  };

  ngOnInit(): void {
     this.getDefect();
     //this.getClass();
     //this.getProjectType();
     this.getRefitType();
     //this.getTrialUnits();
     this.getAccess();
  }

  // classes:any;

  // getClass() {
  //   this.api
  //     .getAPI(environment.API_URL + "master/class?status=1")
  //     .subscribe((res) => {
  //       this.classes = res.data;
  //     });
  // }
  // refit_types=[];
  // getProjectType() {
  //   this.api
  //     .getAPI(environment.API_URL + "master/refit_type?status=1")
  //     .subscribe((res) => {
  //       this.refit_types = res.data;
  //     });
  // }

refit_types=[];
  getRefitType() {
    this.api
      .getAPI(environment.API_URL + "master/refit_type?status=1")
      .subscribe((res) => {
        this.refit_types = res.data;
      });
  }


  /*trialUnits:any;

  getTrialUnits() {
    this.api
      .getAPI(environment.API_URL + "master/project?status=1")
      .subscribe((res) => {
        this.trialUnits = res.data;
      });
  }

  // syncShips()
  // {
  //   this.api.displayLoading(true);
  //   this.api.postAPI(environment.API_URL + "transaction/sync/ships", {}).subscribe((res)=>{
  //       this.logger.log('response',res);
  //       this.api.displayLoading(false);
  //       if(res.status==environment.SUCCESS_CODE) {
  //         this.notification.success(res.message);
  //         this.getShips();
  //       } else {
  //         this.notification.displayMessage(language[environment.DEFAULT_LANG].unableDelete);
  //       }
  //     });
  // }

  /*commands:any;
  getCommand(trial_unit_id= '') {
      this.api
        .getAPI(environment.API_URL + "master/command?trial_unit_id="+trial_unit_id+'&status=1')
        .subscribe((res) => {
          this.commands =res.data;
        });
    }*/

  /*satelliteUnits:any;
  getSatelliteUnits(trial_unit_id='',command_id='') {
    this.api
      .getAPI(environment.API_URL + "master/satellite_units?trial_unit_id="+trial_unit_id+"&command_id="+command_id+'&status=1')
      .subscribe((res) => {
        this.satelliteUnits = res.data;
      });
  }*/

  getDefect() {
    if(this.param==undefined) this.param=""; else this.param;
    this.api
      .getAPI(environment.API_URL + "master/defect?"+this.param)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.countryList = res.data;
        this.dataSource.paginator = this.pagination;
        this.logger.log('country',this.countryList)
        console.log('4545',this.dataSource)
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
    console.log('dad',country)
    this.populate(country);
    var element = <HTMLInputElement> document.getElementById("exampleCheck1");
    if(this.editForm.value.status == 1) {
     element.checked = true;
    }
    else  {
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
        this.api.postAPI(environment.API_URL + "master/defect/details", {
          id: id,
          status: 3,
        }).subscribe((res)=>{
          this.logger.log('response',res);
          if(res.status==environment.SUCCESS_CODE) {
            this.logger.info('delete')
            this.notification.warn('Defect '+language[environment.DEFAULT_LANG].deleteMsg);
            this.getDefect();
          } else {
            this.notification.displayMessage(language[environment.DEFAULT_LANG].unableDelete);
          }
        });
      }
      dialogRef=null;
    });
  }

  onSubmit() {

    //console.log(this.editForm.value)
    //return false;
     if (this.editForm.valid) {
      this.editForm.value.created_by = this.api.userid.user_id;
      this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
      this.api
        .postAPI(
          environment.API_URL + "master/defect/details",
          this.editForm.value
        )
        .subscribe((res) => {
          this.logger.log('response',res);
          //this.error= res.status;
          if(res.status==environment.SUCCESS_CODE){
            // this.logger.log('Formvalue',this.editForm.value);
            this.notification.success(res.message);
            this.getDefect();
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
      this.getDefect();
    }
  }
    applyFilter1(fill) {
      console.log('dsfdsf',fill)
     //this.filterValue1 = (fill.target as HTMLSelectElement).value;
      this.filterValue1=fill.value;
     console.log('dsfdsf',this.filterValue1)
       if(this.filterValue1){
      this.dataSource.filter = this.filterValue1.trim().toLowerCase();
    } else {
      this.getDefect();
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
  searchForm= new FormGroup({
    class:new FormControl(""),
    
  })
  param:any;
  search(){
  let type=this.searchForm.value.class?"refit_type_id="+this.searchForm.value.class:"";
    this.param=type;
    this.getDefect();
  }

 clear(){
    this.searchForm.reset();
    this.param="";
    this.getDefect();
  }
 chooseCountry(event) {
    //this.getClass();
  this.getRefitType();
    
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
        environment.API_URL + "master/defect/excel",
        formData
      )
      .subscribe((res) => {
        this.logger.log('response', res);
        //alert(res.status)
        //this.error= res.status;
        if (res.status == environment.SUCCESS_CODE) {
          // this.logger.log('Formvalue',this.editForm.value);
          this.clearEditFormImport()
          this.notification.success(res.message);

          this.closebutton.nativeElement.click();
          this.getDefect();
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


  fileToUpload: File | null = null;
  onFileHandler(event) {
    console.log(event, event.target.files[0])
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      // console.log("ghjgjhri",file);
      // this.form.patchValue({files:file});
    };

  }


}

