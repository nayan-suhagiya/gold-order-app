import { loginData } from './../../interface/login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: loginData = new loginData();
  @ViewChild('loginData') loginForm: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginSubmit() {
    // console.log(this.loginForm.value);
    this.authService.loginSubmit(this.loginForm.value);
    this.loginForm.reset();
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
  }

  signInWithFacebook() {
    this.authService.facebookSignIn();
  }
}
