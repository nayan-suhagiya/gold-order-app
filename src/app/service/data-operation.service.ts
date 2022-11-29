import { Injectable } from '@angular/core';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root',
})
export class DataOperationService {
  constructor() {}

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
  }
}
