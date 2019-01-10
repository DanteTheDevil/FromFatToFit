import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidations } from '../../validators/confirm.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  serverError: string;
  errors = {
    'required': 'You can\'t left this field empty',
    'minlength': 'Field must contain at least 6 symbols',
    'maxlength': 'You have reached max length(100 symbols)',
    'email': 'Email is invalid',
    'pattern': 'Password must contain at least 1 number and 1 uppercase symbol',
    'matchPassword': 'Confirmed password doesn\'t match to yours',
  };

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.createForm();
    this.serverError = '';
  }

  createForm () {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern( /^(?:(?=.*\d)(?=.*[A-Z]).*)$/)
      ]],
      confirm: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        CustomValidations.matchPassword
      ]]
    });
  }

  onPasswordChange () {
    this.registerForm.controls.confirm.updateValueAndValidity();
  }

  checkErrors(field): boolean {
    return field.errors !== null;
  }

  getError (field): string {
    return Object.keys(field.errors)[0];
  }

  get formValues (): object {
    return this.registerForm.controls;
  }

  registerUser(form): void {
    const {value} = form;

    this.authService.createUser(value).subscribe();
  }
}
