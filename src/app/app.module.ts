import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { ShowOrderComponent } from './component/show-order/show-order.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase.config';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentOrderViewComponent } from './component/payment-order-view/payment-order-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    ShowOrderComponent,
    LoginComponent,
    RegisterComponent,
    PaymentOrderViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    NgxPaginationModule,
    HttpClientModule,
    ClipboardModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
