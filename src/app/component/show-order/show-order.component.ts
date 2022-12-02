import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Data } from 'src/app/interface/data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataOperationService } from 'src/app/service/data-operation.service';
import Swal from 'sweetalert2';

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
  constructor(
    private dataOperationService: DataOperationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataOperationService.getData().subscribe((res) => {
      // console.log(res);
      this.orderData = res;
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
      oid: [''],
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
    this.singleOrder.controls['oid'].setValue(data.oid);
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
    this.singleOrderObj.oid = this.singleOrder.value.oid;
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
      oid: this.singleOrderObj.oid,
      status: this.singleOrderObj.status,
      id: this.singleOrderObj.id,
    };

    if (this.singleOrderObj.id) {
      this.dataOperationService.updateData(data, this.singleOrderObj.id);
      this.router.navigate(['']);
      Swal.fire('Success!', 'Order Updated Successfully!', 'success');
    }
  }
}
