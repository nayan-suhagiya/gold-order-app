import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Data } from 'src/app/interface/data';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataOperationService } from 'src/app/service/data-operation.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import * as excel from 'xlsx';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
})
export class ShowOrderComponent implements OnInit {
  orderData: any;
  singleOrder: FormGroup;
  singleOrderObj: Data = new Data();
  singleOrderIndex: number;
  searchText: string;
  excelFileData: any;
  @ViewChild('fileValue') file: ElementRef;
  constructor(
    private dataOperationService: DataOperationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.dataOperationService.getData().subscribe((res) => {
      // console.log(res);
      this.orderData = res;
      this.spinner.hide();
    });
    // console.log(this.orderData);

    //for update data to localstorage
    this.singleOrder = this.formBuilder.group({
      jtype: [''],
      price: [''],
      quantity: [''],
      weight: [''],
      cname: [''],
      cmobile: [''],
      caddress: [''],
      city: [''],
      status: [''],
      id: [''],
    });
  }

  edit(data: Data, i: number) {
    //for the localstorage change data
    this.singleOrder.controls['jtype'].setValue(data.jtype);
    this.singleOrder.controls['price'].setValue(data.price);
    this.singleOrder.controls['quantity'].setValue(data.quantity);
    this.singleOrder.controls['weight'].setValue(data.weight);
    this.singleOrder.controls['cname'].setValue(data.cname);
    this.singleOrder.controls['cmobile'].setValue(data.cmobile);
    this.singleOrder.controls['caddress'].setValue(data.caddress);
    this.singleOrder.controls['city'].setValue(data.city);
    this.singleOrder.controls['status'].setValue(data.status);
    this.singleOrder.controls['id'].setValue(data.id);
    // this.singleOrderIndex = i;
    // console.log(this.singleOrder);
  }

  update() {
    //updata function works on localstorage data
    this.singleOrderObj.jtype = this.singleOrder.value.jtype;
    this.singleOrderObj.price = this.singleOrder.value.price;
    this.singleOrderObj.quantity = this.singleOrder.value.quantity;
    this.singleOrderObj.weight = this.singleOrder.value.weight;
    this.singleOrderObj.cname = this.singleOrder.value.cname;
    this.singleOrderObj.cmobile = this.singleOrder.value.cmobile;
    this.singleOrderObj.caddress = this.singleOrder.value.caddress;
    this.singleOrderObj.city = this.singleOrder.value.city;
    this.singleOrderObj.status = this.singleOrder.value.status;
    this.singleOrderObj.id = this.singleOrder.value.id;
    /*
    this.dataOperationService.updateData(
      this.singleOrderObj,
      this.singleOrderObj.oid
    );
    this.ngOnInit();
    this.router.navigate(['']);
    Swal.fire('Success!', 'Order Updated Successfully!', 'success');
    console.log(this.singleOrderObj);
    */

    const data = {
      jtype: this.singleOrderObj.jtype,
      price: this.singleOrderObj.price,
      quantity: this.singleOrderObj.quantity,
      weight: this.singleOrderObj.weight,
      cname: this.singleOrderObj.cname,
      cmobile: this.singleOrderObj.cmobile,
      caddress: this.singleOrderObj.caddress,
      city: this.singleOrderObj.city,
      status: this.singleOrderObj.status,
      id: this.singleOrderObj.id,
    };

    if (this.singleOrderObj.id) {
      this.dataOperationService.updateData(data, this.singleOrderObj.id);
      this.router.navigate(['']);
      Swal.fire('Success!', 'Order Updated Successfully!', 'success');
    }
  }

  delete(data: Data, id: string) {
    // console.log(id);
    this.dataOperationService.deleteData(data, id);
  }

  exportToExcel(): void {
    const ws: excel.WorkSheet = excel.utils.json_to_sheet(this.orderData);

    const wb: excel.WorkBook = excel.utils.book_new();
    excel.utils.book_append_sheet(wb, ws, 'OrderDetails');

    excel.writeFile(wb, 'OrdersDetails.xlsx');
  }

  search() {
    if (this.searchText == '') {
      this.ngOnInit();
    } else {
      this.orderData = this.orderData.filter((res) => {
        return res.cname
          ?.toLocaleLowerCase()
          .match(this.searchText?.toLocaleLowerCase());
      });
    }
  }

  importExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var wb = excel.read(fileReader.result, { type: 'binary' });
      var ws = wb.SheetNames;

      this.excelFileData = excel.utils.sheet_to_json(wb.Sheets[ws[0]]);
      // console.log(this.excelFileData);
    };
  }

  uploadExcel() {
    // console.log('File upload successfully');
    this.file.nativeElement.value = '';
    this.excelFileData.forEach((element) => {
      this.dataOperationService.saveData(element);
      Swal.fire('Success!', 'File Data Uploaded Successfully', 'success');
    });
  }
}
