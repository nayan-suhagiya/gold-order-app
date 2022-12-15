import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Data } from 'src/app/interface/data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataOperationService } from 'src/app/service/data-operation.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment-order-view',
  templateUrl: './payment-order-view.component.html',
  styleUrls: ['./payment-order-view.component.css'],
})
export class PaymentOrderViewComponent implements OnInit {
  id: string;
  data = new Data();
  dataArr: Data[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataOperationService: DataOperationService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);

    this.dataOperationService.getData().subscribe((res: any) => {
      res = res.filter((result) => {
        return result.id.match(this.id);
      });
      this.data = res[0];
      this.dataArr.push(this.data);
      // console.log(this.data);
    });
  }

  initializePayment(): void {
    this.authService.isLoggedIn = true;
    this.http
      .post('http://localhost:4242/checkout', {
        odata: this.dataArr,
      })
      .subscribe(async (res: any) => {
        console.log(res);
        localStorage.setItem('OLink', JSON.stringify(res.url));
        let stripe = await loadStripe(
          ' pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg'
        );

        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}

/*
  publishable key:
  pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg

  secret key:
  sk_test_51MEUprSB4EBQaMcWE1ZLkvfXNkvnfFCWntMjALBb13KczmT3ln1PRNBO5gn5IfwlURcumUQBztZUXMwzICfWVdyt00Bl9m1XXf
*/
