import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { loginData } from '../interface/login';
import { registerData } from '../interface/register';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
} from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';

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
        const user = userCredential.user;
        // console.log(user.email);
        // console.log('Logged in');
        localStorage.setItem('LoggedInEmail', user.email);
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
        Swal.fire(
          'Error!',
          'Email And Password Not Matched! OR User Not Found!',
          'error'
        );
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
        this.router.navigate(['/login']);
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
        localStorage.removeItem('LoggedInEmail');
        localStorage.removeItem('googletoken');
      })
      .catch((error) => {
        this.isLoggedIn = true;
        Swal.fire('Error!', 'Some Error Occurs!', 'error');
      });
  }

  //Sign in with gogle
  googleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        this.isLoggedIn = true;
        this.router.navigate(['']);
        localStorage.setItem('googletoken', JSON.stringify(token));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.warn(errorCode, errorMessage);
        Swal.fire('Error!', 'Something Went Wrong!', 'error');
      });
  }

  //sign in with facebook
  facebookSignIn() {
    const auth = getAuth();
    var provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        this.isLoggedIn = true;
        this.router.navigate(['']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        Swal.fire('Error!', 'Something Went Wrong!', 'error');
      });
  }
}
