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
  dataRef: AngularFirestoreCollection<any>;
  dataDoc: AngularFirestoreDocument<Data>;
  orders: Observable<any[]>;

  constructor(private router: Router, private db: AngularFirestore) {
    this.dataRef = this.db.collection('data', (ref) =>
      ref.orderBy('cname', 'asc')
    );

    this.orders = this.dataRef.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Data;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
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
    return this.orders;
  }

  updateData(data: Data, id) {
    // let orderData = JSON.parse(localStorage.getItem('orderData'));
    // if (index != -1) {
    //   orderData[index] = data;
    // } else {
    //   console.log('Error!');
    //   Swal.fire('Error!', 'Order not updated!', 'error');
    // }
    // localStorage.setItem('orderData', JSON.stringify(orderData));
    // .collection("data").where("oid", "==", 0)

    this.dataDoc = this.db.doc(`data/${id}`);
    this.dataDoc.update(data);
    // console.log('updated');
  }

  deleteData(data: Data, id: string) {
    // console.log(data);
    // console.log('deleted');

    Swal.fire({
      title: 'Are you sure?',
      text: 'Your order will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataDoc = this.db.doc(`data/${id}`);
        this.dataDoc.delete();
        Swal.fire('Success!', 'Order deleted successfully!', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Eror!', 'Order not deleted!', 'error');
      }
    });
  }
}
