import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  errors = {
    'required': 'You can\'t left this field empty',
    'email': 'Email is invalid',
  };
  email: string;
  password: string;
  constructor(private authService: AuthService) {
    this.email = '';
    this.password = '';
  }

  getError (field): string {
    return Object.keys(field.errors)[0];
  }

  ngOnInit() {
  }

  loginEmail (form) {
    this.authService.loginWithEmail(form)
      .subscribe();
  }
  loginSocial (type) {
    this.authService.loginWithSocial(type).subscribe();
  }
}
