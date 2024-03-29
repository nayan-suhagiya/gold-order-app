import { Data } from 'src/app/interface/data';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ShowOrderComponent } from './component/show-order/show-order.component';
import { PaymentOrderViewComponent } from './component/payment-order-view/payment-order-view.component';

const routes: Routes = [
  {
    path: '',
    component: ShowOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-order',
    component: AddOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'payment-order-view/:id',
    component: PaymentOrderViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
