import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderViewComponent } from './payment-order-view.component';

describe('PaymentOrderViewComponent', () => {
  let component: PaymentOrderViewComponent;
  let fixture: ComponentFixture<PaymentOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOrderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
