import { Injectable } from '@angular/core';
import { loginData } from '../interface/login';
import { registerData } from '../interface/register';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private spinner: NgxSpinnerService) {}

  loginSubmit(data: loginData) {
    console.log(data);
  }

  registerSubmit(data: registerData) {
    // console.log(data);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.passwd)
      .then((userCredential) => {
        // const user = userCredential.user;
        console.log('User added');
        Swal.fire('Success!', 'User Added SuccessFully!', 'success');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log('error');
        Swal.fire('Error!', 'Sme Error Occurs!', 'error');
      });
  }
}
