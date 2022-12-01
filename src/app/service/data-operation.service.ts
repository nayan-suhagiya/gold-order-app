import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../interface/data';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DataOperationService {
  constructor(private router: Router) {}

  saveData(data: Data) {
    let orderData = localStorage.getItem('orderData');
    let orderObj;
    if (orderData == null) {
      orderObj = [];
    } else {
      orderObj = JSON.parse(orderData);
    }

    orderObj.push(data);
    localStorage.setItem('orderData', JSON.stringify(orderObj));
    this.router.navigate(['']);
  }

  getData() {
    return JSON.parse(localStorage.getItem('orderData'));
  }

  // editData(data: Data) {
  //   return data;
  // }
  updateData(data: Data, index: number) {
    let orderData = JSON.parse(localStorage.getItem('orderData'));
    if (index != -1) {
      orderData[index] = data;
    } else {
      console.log('Error!');
      Swal.fire('Error!', 'Order not updated!', 'error');
    }
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }
}
