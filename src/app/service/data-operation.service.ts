import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../interface/data';
import Swal from 'sweetalert2';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataOperationService {
  private dbPath = '/demo';
  dataRef: AngularFirestoreCollection<any>;
  dataDoc: AngularFirestoreDocument<Data>;
  orders: Observable<any[]>;

  constructor(private router: Router, private db: AngularFirestore) {
    // this.dataRef = db.collection(this.dbPath);
    this.dataRef = this.db.collection('data', (ref) =>
      ref.orderBy('cname', 'asc')
    );

    // this.orders = this.dataRef.snapshotChanges().map((changes) => {
    //   return changes.map((a) => {
    //     const data = a.payload.doc.data() as Data;
    //     data.oid = a.payload.doc.id;
    //     return data;
    //   });
    // });
  }
  saveData(data: Data) {
    /*
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
    */
    this.dataRef.add(data);
    Swal.fire('Success!', 'Order added successfully!', 'success');
    this.router.navigate(['']);
  }

  getData() {
    // return JSON.parse(localStorage.getItem('orderData'));

    return this.db.collection('data').valueChanges();
  }

  // editData(data: Data) {
  //   return data;
  // }
  updateData(data: Data, id) {
    // let orderData = JSON.parse(localStorage.getItem('orderData'));
    // if (index != -1) {
    //   orderData[index] = data;
    // } else {
    //   console.log('Error!');
    //   Swal.fire('Error!', 'Order not updated!', 'error');
    // }
    // localStorage.setItem('orderData', JSON.stringify(orderData));

    this.dataDoc = this.db.doc(`data/${data.oid}`);
    this.dataDoc.update(data);
  }
}
