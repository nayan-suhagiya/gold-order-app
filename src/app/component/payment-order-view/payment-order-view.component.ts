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
  paymentHandler: any = null;

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

      this.invokeStripe();
    });
  }

  initializePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Order Payment',
      description: 'Payment With Stripe',
      amount: amount * 100,
      currency: 'INR',
      height: '600px',
      width: '600px',
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MEUprSB4EBQaMcWL4T3jDRIN9KIw12IYMIrn9HvUQpUxDeTRfuOPhDJ8fVeZ9gygzb2pk9ZWpq3R5lfJO4mDsFC00A8gLCxUg',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
