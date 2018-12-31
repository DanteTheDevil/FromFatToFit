import { AbstractControl } from '@angular/forms';

export class CustomValidations {
  static matchPassword (control: AbstractControl): object | null {
    const form = control.parent;

    if (form) {
      const {password}: any = form.controls;
      const confirmValue = control.value;

      return confirmValue !== password.value ?
        {matchPassword: true} :
        null;
    }
    return null;
  }
  asyncEmail (control: AbstractControl): object | null {
    return null;
  }
}
