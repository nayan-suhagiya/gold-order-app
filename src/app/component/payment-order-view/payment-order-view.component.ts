import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Data } from 'src/app/interface/data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataOperationService } from 'src/app/service/data-operation.service';
import { AuthService } from 'src/app/service/auth.service';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private http: HttpClient,
    private clipBoard: ClipboardService,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.authService.isLoggedIn = true;
    this.http
      .post('http://localhost:4242/checkout', {
        odata: this.dataArr,
      })
      .subscribe(async (res: any) => {
        // console.log(res);
        // localStorage.setItem('OLink', JSON.stringify(res.url));
        let stripe = await loadStripe(
          ' pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg'
        );
        this.spinner.hide();
        Swal.fire({
          title: 'Your link is generated!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Copy it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.clipBoard.copy(res.url);
          } else {
            Swal.fire('Link not copied!');
          }
        });
        // stripe?.redirectToCheckout({
        //   sessionId: res.id,
        // });
      });
  }
}

/*
  publishable key:
  pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg

  secret key:
  sk_test_51MEUprSB4EBQaMcWE1ZLkvfXNkvnfFCWntMjALBb13KczmT3ln1PRNBO5gn5IfwlURcumUQBztZUXMwzICfWVdyt00Bl9m1XXf
*/
