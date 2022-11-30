import { Component, OnInit } from '@angular/core';
import { DataOperationService } from 'src/app/service/data-operation.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
})
export class ShowOrderComponent implements OnInit {
  orderData: any;
  constructor(private dataOperationService: DataOperationService) {}

  ngOnInit(): void {
    this.orderData = this.dataOperationService.getData();
    // console.log(this.orderData);
  }
}
