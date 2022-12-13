import { Data } from 'src/app/interface/data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataOperationService } from 'src/app/service/data-operation.service';

@Component({
  selector: 'app-payment-order-view',
  templateUrl: './payment-order-view.component.html',
  styleUrls: ['./payment-order-view.component.css'],
})
export class PaymentOrderViewComponent implements OnInit {
  id: string;
  data = new Data();

  constructor(
    private route: ActivatedRoute,
    private dataOperationService: DataOperationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);

    this.dataOperationService.getData().subscribe((res: any) => {
      res = res.filter((result) => {
        return result.id.match(this.id);
      });
      this.data = res[0];
      // console.log(this.data);
    });
  }
}
