import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators, FormGroupDirective,FormBuilder, FormArray,} from "@angular/forms";
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
  selector: 'app-stock-check',
  templateUrl: './stock-check.component.html',
  styleUrls: ['./stock-check.component.scss']
})
export class StockCheckComponent implements OnInit {

displayedColumns: string[] = [
  // "bar_code",
  // "storage_location",
  // "unit_cost",
  
  // "Qty",
  // "name",
 
  
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
moment=moment;
form: FormGroup;
addmore: FormGroup[] = [];







public permission={
  add:false,
  edit:false,
  view:false,
  delete:false,
};

@ViewChild(MatPaginator) pagination: MatPaginator;
@ViewChild("closebutton") closebutton;
@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  items_master: any;
  

constructor(public api: ApiService, private notification : NotificationService,private formBuilder: FormBuilder,
  private dialog:MatDialog, private router : Router, private elementref : ElementRef,private logger:ConsoleService) {
    

}
docForm!: FormGroup;
items!: FormArray;




public editForm = this.formBuilder.group({
  id: new FormControl(""),
  bar_code: new FormControl("", [Validators.required]),
  
  // unit_cost : new FormControl("", [Validators.required]),
  item_code : new FormControl(""),
  description: new FormControl(""),
  // qty: new FormControl("", [Validators.required]),
  batch: new FormControl("",),
  storage_location: new FormControl("", [Validators.required]),
 
  created_by: new FormControl(""),
  created_ip: new FormControl(""),
  modified_by: new FormControl(""),
  sequence : new FormControl(""),
  status: new FormControl(""),
  itemc: this.formBuilder.array([]),
});


status = this.editForm.value.status;
populate(data) {
  
  this.editForm.patchValue(data);

  this.items = this.docForm.get('itemc') as FormArray;
  this.clearFormArray(this.itemc);

  // this.editForm.patchValue({project_id:data.project_id.id});
  // this.editForm.patchValue({trial_unit:data.trial_unit.id});
  /*this.getCommand(data.trial_unit.id);
  this.getSatelliteUnits(data.trial_unit.id,data.command.id);
  this.getShips(data.trial_unit.id,data.satellite_unit.id);
  setTimeout(()=>{
    this.editForm.patchValue({satellite_unit:data.satellite_unit.id});
    this.editForm.patchValue({command:data.command?data.command.id:''});
    this.editForm.patchValue({ship:data.ship.id});
  },500);*/
 

  // this.formBuilder.array([]),
  this.editForm.patchValue({modified_by:this.api.userid.user_id});
  this.logger.info(data.status)
  // if(data.hospitals.length>0)
  // {
  //   for(let i=0;i<data.hospitals.length;i++)
  //   {
      
  //       let hosArr=this.formBuilder.group({
  //       country_id: data.hospitals[i].country.id,
  //       state_id:data.hospitals[i].state.id,
  //       city_id: data.hospitals[i].city.id,
  //       hospital: data.hospitals[i].hospital.id,
        
  //     });
  //     this.hospital.push(hosArr)
              
  //   }
  // }
 }
// populate(data) {

//   this.api.displayLoading(true)
//    this.api
//    .getAPI(environment.API_URL + "master/items_master")
//   .subscribe((res) => {
//     this.api.displayLoading(false)
//     //console.log(res.data,"GEET");

//     let data = res.data;

//     this.showErrors=false;
//     this.clearFormArray(this.formmapping);
//     // this.editForm.patchValue({form:form_id});
//     //this.editForm.patchValue({id:data.id,form:data.form,created_by:data.created_by,modified_by:this.api.userid.user_id,status:data.status});
//     //let data_access = data.formmapping.length
//     //console.log('fdsfd',data)

//     //setTimeout(()=>{
//       if(data.length>0)
//       {
//         for(let i=0;i<data.length;i++)
//         {
//           this.addformmapping(data[i])                  
//         }
//       }
//     //},2000)

//   });    
// }

   

initForm() {
  this.editForm.patchValue({
    status: "1",
  });
}

Error = (controlName: string, errorName: string) => {
  return this.editForm.controls[controlName].hasError(errorName);
};
get add() {
  return this.editForm.get('addmore') as FormArray;
}

ngOnInit(): void {  
  //  this.getBatch();
  //  this.addItem();
   this.getstocks();
   this.getStoragelocation();
   this.getAccess();
   this.getStockRegister();
   this.getCode();
}
// addBarCodeAndStorageLocation() {
//   this.barCodeStorage.push(this.fb.group({
//     bar_code: ['', Validators.required],
//     storage_location: ['', Validators.required],
//   }));
// }

// Function to remove a form control
// removeControl(index: number) {
//   this.barCodeStorage.removeAt(index);
// }
// addBarCodeAndStorageLocation() {
//   const newFormGroup = this.fb.group({
//     bar_code: ['', Validators.required],
//     storage_location: ['', Validators.required],
//   });

//   this.addmore.push(newFormGroup);
//   console.log("add more", this.addmore.push(newFormGroup))

  // this.editForm.get('bar_code').reset('');
  // this.editForm.get('storage_location').reset('');
// }

// add more from form mapping
get itemc() : FormArray {
  return this.editForm.get("itemc") as FormArray
}

onRoleAdd()
  {
    
    console.log('hvufuyfyufyfyfyu')
      this.addItems();
    
  }
  matchedItem:any;
  addItems() {
    console.log('hvufu2222yfyufyfyfyu')

    this.matchedItem = this.codes.find(item => item.bar_code === this.barcodeValue);
    if(this.matchedItem){
      this.showInputs = true;
      this.itemc.push(this.newItems());
    } else {
      console.log('fbgjfbghfgfg',this.errorMessage)
      this.showInputs = false;
      this.notification.displayMessage("Record not found. Please enter a valid barcode");
    }
      
 
   }

// get formmapping() : FormArray {
// return this.editForm.get("formmapping") as FormArray
// }
selectedRoles=[];
// newformmapping(data): FormGroup {
//   return this.formBuilder.group({
//      //order: new FormControl((data && data.order && data.order?data.order:'')),
//      item_code: new FormControl((data && data.codes_id?data.codes_id:'')),
//      item_description: new FormControl((data && data.codes_id?data.codes_id:'')),
//      // region_id: new FormControl(''),
//      unit_cost: new FormControl(('')),
//      qty: new FormControl(('')),
     
//   });
// }

newItems(): FormGroup {
  return this.formBuilder.group({
    item_code: new FormControl((this.matchedItem.code)),
    description: new FormControl((this.matchedItem.description)),
    unit_cost: new FormControl(''),
    qty: new FormControl(''),
 });
  
 
}

// newItems1(): FormGroup {
//   if (this.barcodeValue) {
//     console.log("thisbarcode",this.barcodeValue)
//     // Fetch data based on the barcode value
//     const matchedItem = this.codes.find(item => item.bar_code === this.barcodeValue);
//     console.log('abc',matchedItem)
//     if (matchedItem) {
//       console.log("ddddddddddddd",matchedItem)
//       console.log(matchedItem.item_code);
//       console.log(matchedItem.code);
//       this.showInputs = true;
//       return this.formBuilder.group({
//      item_code: new FormControl((matchedItem.code)),
//      description: new FormControl((matchedItem.description)),
//      unit_cost: new FormControl(''),
//      qty: new FormControl(''),
//   });
//     } else {
//       console.log('fbgjfbghfgfg',this.errorMessage)
//       this.showInputs = false;
//       this.notification.displayMessage("Record not found. Please enter a valid barcode");
//     }
//     this.barcodeValue = ''; // Reset the barcode value
//   }
 
// }
clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0)
  }
}
clearItems()
{

  this.editForm = new FormGroup({
    roles: new FormArray([])
  });
}


removeItems(i:number){
  this.itemc.removeAt(i);
}
  
// addformmapping(data='') {

//   // setTimeout(()=>{

//   //   this.formmapping.push(this.newformmapping(data));
//   // },5)
//  this.formmapping.push(this.newformmapping(data));
// }

// removeformmapping(i:number){
// this.formmapping.removeAt(i);
// }










storagelocations:any;
getStoragelocation() {
  this.api
    .getAPI(environment.API_URL + "master/storage_location")
    .subscribe((res) => {
      this.storagelocations = res.data;
      console.log("storagelocation",this.storagelocations)
    });
}

codes:any;
getCode() {
  this.api
    .getAPI(environment.API_URL + "master/items_master")
    .subscribe((res) => {
      this.codes = res.data;
      console.log("codes",this.codes)
    });
}
stocks:any;
getstocks() {
  this.api
    .getAPI(environment.API_URL + "master/stock_generation")
    .subscribe((res) => {
      this.stocks = res.data;
      console.log("stocks",this.stocks)
    });
}







stockregisters:any
getStockRegister() {
  this.api
    .getAPI(environment.API_URL + "master/stock_generation")
    .subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.stockregisters = res.data;
      this.dataSource.paginator = this.pagination;
      this.logger.log('stockregisters',this.stockregisters)
    });
}
// showInputs = false;
//       inputChanges(event: any) {


//        // alert("test")
//         const barcodeValue = event.target.value;
//         if (barcodeValue) {
          
          
//             const matchedItem = this.codes.find(item => item.bar_code === barcodeValue);
//             if (matchedItem) {
//               console.log(matchedItem.item_code)
//               console.log(matchedItem.code)
//               this.showInputs = true;
//               this.editForm.patchValue({
//                 item_code: matchedItem.code,
//                 description: matchedItem.description,
//               });
//             } else {
//               this.editForm.patchValue({
//                 item_code: '',
//                 description: '',
//               });
//             }
          
         
//         }
//       }



showInputs = false;
errorMessage = '';
barcodeValue = ''; // Add a variable to store the barcode

inputChanges(event: any) {
  this.errorMessage = '';
  this.barcodeValue = event.target.value; // Store the barcode value
}

addBarCodeAndStorageLocation() {
  if (this.barcodeValue) {
    // Fetch data based on the barcode value
    const matchedItem = this.codes.find(item => item.bar_code === this.barcodeValue);
    if (matchedItem) {
      console.log(matchedItem.item_code);
      console.log(matchedItem.code);
      this.showInputs = true;
     
    } else {
      this.showInputs = false;
      this.errorMessage = 'Record not found. Please enter a valid barcode.';
    }
    this.barcodeValue = ''; // Reset the barcode value
  }
  // Rest of your add logic
}

// add morew n work
createItem(): FormGroup {
  return this.formBuilder.group({
    //order:'',
    item_code:'',
    description: '',
    qty:'',
    unit_cost:'',
    
  });
}

addMore(): void {

  alert("test")
  this.items = this.docForm.get('itemc') as FormArray;
  this.items.push(this.createItem());
}

removeItem(i): void {
  this.items.removeAt(i);
  /*delete this.items.value[i];
  delete this.items.controls[i];*/
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
      this.api.postAPI(environment.API_URL + "master/stock_generation/details", {
        id: id,
        status: 3,
      }).subscribe((res)=>{
        this.logger.log('response',res);
        if(res.status==environment.SUCCESS_CODE) {
          this.logger.info('delete')
          this.notification.warn('Stock'+language[environment.DEFAULT_LANG].deleteMsg);
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
  console.log("submi1111t",this.editForm.value)
   if (this.editForm.valid) {
    console.log("submit2222",this.editForm.value)
    this.editForm.value.created_by = this.api.userid.user_id;
    this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
    this.api
      .postAPI(
        environment.API_URL + "master/stock_generation/details",
        this.editForm.value
      )
      .subscribe((res) => {
        this.logger.log('response',res);
        //this.error= res.status;
        if(res.status==environment.SUCCESS_CODE){
          // this.logger.log('Formvalue',this.editForm.value);
          this.notification.success(res.message);
          this.getstocks();
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
// fetchbarcode() {
//   console.log("fetchbarcode",this.editForm.value)
//    if (this.editForm.valid) {
//     this.editForm.value.created_by = this.api.userid.user_id;
//     this.editForm.value.status = this.editForm.value.status==true ? 1 : 2;
//     this.api
//       .postAPI(
//         environment.API_URL + "master/design/details",
//         this.editForm.value
        
//       )
//       .subscribe((res) => {
//         this.logger.log('response',res);
//         //this.error= res.status;
//         if(res.status==environment.SUCCESS_CODE){
//           // this.logger.log('Formvalue',this.editForm.value);
//           this.notification.success(res.message);
//           this.getstocks();
//           this.closebutton.nativeElement.click();
//         } else if(res.status==environment.ERROR_CODE) {
//           this.error_msg=true;
//           this.ErrorMsg=res.message;
//           setTimeout(()=> {
//             this.error_msg = false;
//          }, 2000);
//         } else {
//           this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
//         }

//       });
//   }


// fetchBarcode() {
//   console.log("fetchbarcode", this.editForm.value);
//   if (this.editForm.valid) {
//     this.editForm.value.created_by = this.api.userid.user_id;
//     this.editForm.value.status = this.editForm.value.status == true ? 1 : 2;

//     this.api
//       .postAPI(environment.API_URL + "master/design/details", this.editForm.value)
//       .subscribe((res) => {
//         this.logger.log('response', res);
//         console.log("postbarcode",res.date)
//         if (res.status == environment.SUCCESS_CODE) {
//           this.notification.success(res.message);

//           // After a successful POST request, make a GET request
//           this.api
//             .getAPI(environment.API_URL + "master/items_master?bar_code=" + this.editForm.value.bar_code)
//             .subscribe((Res) => {
//               if (Res.data.length > 0) {
//                 console.log("barcode", getBarCode)
//                 let getBarCode = Res.data[0].bar_code;

//                 // Compare the POST and GET bar_code
//                 if (this.barcodeValue=== getBarCode) {
//                   console.log('POST bar_code and GET bar_code are equal');
//                 } else {
//                   console.log('POST bar_code and GET bar_code are not equal');
//                 }
//                 // Item found in GET request, you can access it with getRes.data[0]
//                 this.getstocks();
//                 this.closebutton.nativeElement.click();
//               } else {
//                 // Item not found in GET request, provide a message
//                  console.log('Item not found in items_master');
//               }
//             });
//         } else if (res.status == environment.ERROR_CODE) {
//           this.error_msg = true;
//           this.ErrorMsg = res.message;
//           setTimeout(() => {
//             this.error_msg = false;
//           }, 2000);
//         } else {
//           this.notification.displayMessage(language[environment.DEFAULT_LANG].unableSubmit);
//         }
//       });
//   }
// }


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
    // for number only
    numbersOnly(event:any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    
    }
    
    // showInputs = false;
    // inputChanges(val){
    //   console.log(val)
    // }
    // addStorageLocation() {
    //   const newStorageLocation = this.fb.group({
    //     storage_location: ['', Validators.required],
    //     bar_code: ['', Validators.required],
    //   });
  
    //   this.storageLocations.push(newStorageLocation);
    // }
    // removeStorageLocation(index: number) {
    //   this.storageLocations.removeAt(index);
    // }
    // showInputs = false;
    //   inputChanges(event: any) {
    //     const barcodeValue = event.target.value;
    //     if (barcodeValue) {
          
          
    //         const matchedItem = this.codes.find(item => item.bar_code === barcodeValue);
    //         if (matchedItem) {
    //           console.log(matchedItem.item_code)
    //           console.log(matchedItem.code)
    //           this.showInputs = true;
    //           this.editForm.patchValue({
    //             item_code: matchedItem.code,
    //             description: matchedItem.description,
    //           });
    //         } else {
    //           this.editForm.patchValue({
    //             item_code: '',
    //             description: '',
    //           });
    //         }
          
         
    //     }
    //   }
    }
        
    
    
  