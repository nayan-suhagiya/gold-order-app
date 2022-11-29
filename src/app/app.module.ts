import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { ShowOrderComponent } from './component/show-order/show-order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AddOrderComponent, ShowOrderComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
