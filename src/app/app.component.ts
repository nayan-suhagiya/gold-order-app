import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { firebaseConfig } from './firebase.config';
import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gold';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    initializeApp(firebaseConfig);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.logOut();
  }
}
