import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { loginData } from '../interface/login';
import { registerData } from '../interface/register';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  loginSubmit(data: loginData) {
    // console.log(data);
    this.spinner.show();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.passwd)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log('Logged in');
        this.router.navigate(['']);
        this.isLoggedIn = true;
        this.spinner.hide();
        // Swal.fire('Success!', 'User LoggedIn SuccessFully!', 'success');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        this.isLoggedIn = false;
        this.spinner.hide();
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
        this.isLoggedIn = true;
        this.spinner.hide();
        this.router.navigate(['']);
        Swal.fire('Success!', 'User Added SuccessFully!', 'success');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('error');
        this.isLoggedIn = false;
        this.spinner.hide();
        Swal.fire('Error!', 'Please Provide Valid Information!', 'error');
      });
  }

  logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Swal.fire('Success!', 'Logout SuccessFully!', 'success');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.isLoggedIn = true;
        Swal.fire('Error!', 'Some Error Occurs!', 'error');
      });
  }
}
