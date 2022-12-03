import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { loginData } from '../interface/login';
import { registerData } from '../interface/register';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  loginSubmit(data: loginData) {
    // console.log(data);
    this.spinner.show();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.passwd)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log('Logged in');
        this.spinner.hide();
        Swal.fire('Success!', 'User LoggedIn SuccessFully!', 'success');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        Swal.fire('Error!', 'Email And Password Not Matched!', 'error');
      });
  }

  registerSubmit(data: registerData) {
    // console.log(data);
    this.spinner.show();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.passwd)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log('User added');
        this.spinner.hide();
        this.router.navigate(['/login']);
        Swal.fire('Success!', 'User Added SuccessFully!', 'success');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('error');
        Swal.fire('Error!', 'Please Provide Valid Information!', 'error');
      });
  }
}
