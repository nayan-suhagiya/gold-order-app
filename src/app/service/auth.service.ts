import { Injectable } from '@angular/core';
import { loginData } from '../interface/login';
import { registerData } from '../interface/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginSubmit(data: loginData) {
    console.log(data);
  }

  registerSubmit(data: registerData) {
    console.log(data);
  }
}
