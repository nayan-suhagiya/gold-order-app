import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Data } from 'src/app/interface/data';
import { DataOperationService } from 'src/app/service/data-operation.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  oData: Data = new Data();
  @ViewChild('orderForm') form: any;
  constructor(
    private dataOperationService: DataOperationService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  orderSubmit() {
    // console.log(this.form.value);
    this.dataOperationService.saveData(this.form.value);
    this.form.reset();
  }
}
