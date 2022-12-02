import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { registerData } from 'src/app/interface/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: registerData = new registerData();
  @ViewChild('registerData') registerForm: NgForm;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  registerSubmit() {
    // console.log(this.registerForm.value);
    this.authService.registerSubmit(this.registerForm.value);
    this.registerForm.reset();
  }
}
