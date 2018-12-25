import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

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
  checkErrors(field): boolean {
    return field.errors !== null;
  }
  getError (field): string {
    return Object.keys(field.errors)[0];
  }
  ngOnInit() {
  }
  loginEmail (form) {
    this.authService.loginWithEmail(form)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    console.log(form);
  }
  loginGoogle () {
    this.authService.loginWithGoogle()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  loginFacebook () {
    this.authService.loginWithFacebook()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
}
