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
    this.orderData = this.dataOperationService.getData();
    // console.log(this.orderData);

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
    });
  }

  edit(data: Data, i: number) {
    this.singleOrder.controls['jtype'].setValue(data.jtype);
    this.singleOrder.controls['price'].setValue(data.price);
    this.singleOrder.controls['quantity'].setValue(data.quantity);
    this.singleOrder.controls['weight'].setValue(data.weight);
    this.singleOrder.controls['cname'].setValue(data.cname);
    this.singleOrder.controls['cmobile'].setValue(data.cmobile);
    this.singleOrder.controls['caddress'].setValue(data.caddress);
    this.singleOrder.controls['city'].setValue(data.city);
    this.singleOrder.controls['status'].setValue(data.status);
    this.singleOrderIndex = i;
    // console.log(this.singleOrder);
  }

  update() {
    this.singleOrderObj.jtype = this.singleOrder.value.jtype;
    this.singleOrderObj.price = this.singleOrder.value.price;
    this.singleOrderObj.quantity = this.singleOrder.value.quantity;
    this.singleOrderObj.weight = this.singleOrder.value.weight;
    this.singleOrderObj.cname = this.singleOrder.value.cname;
    this.singleOrderObj.cmobile = this.singleOrder.value.cmobile;
    this.singleOrderObj.caddress = this.singleOrder.value.caddress;
    this.singleOrderObj.city = this.singleOrder.value.city;
    this.singleOrderObj.status = this.singleOrder.value.status;
    this.dataOperationService.updateData(
      this.singleOrderObj,
      this.singleOrderIndex
    );
    this.ngOnInit();
    this.router.navigate(['']);
    Swal.fire('Success!', 'Order Updated Successfully!', 'success');
    // console.log(this.singleOrderObj);
  }
}
