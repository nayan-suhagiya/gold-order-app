import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { ShowOrderComponent } from './component/show-order/show-order.component';

const routes: Routes = [
  {
    path: '',
    component: ShowOrderComponent,
  },
  {
    path: 'add-order',
    component: AddOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
