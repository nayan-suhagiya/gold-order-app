import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Data } from 'src/app/interface/data';
import { DataOperationService } from 'src/app/service/data-operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  oData: Data = new Data();
  @ViewChild('orderForm') form: any;
  constructor(private dataOperationService: DataOperationService) {}

  ngOnInit(): void {}

  orderSubmit() {
    // console.log(this.form.value);
    this.dataOperationService.saveData(this.form.value);
    Swal.fire('Success!', 'Order added successfully!', 'success');
    this.form.reset();
  }
}
