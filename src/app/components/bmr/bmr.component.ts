import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent implements OnDestroy {
  public calculator: FormGroup;
  public subscription: Subscription = new Subscription;
  public result: number | null;
  public formulas: object = {
    'harris': 'Harris-Benedict',
    'who': 'World Health Organization',
    'mifflin': 'Mifflin-St. Jeor',
    'owen': 'Owen'
  };

  constructor(private formBuilder: FormBuilder, private calcService: CalculatorService, private authService: AuthService,
              private userService: UsersService) {
    this.createForm();
    this.result = null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getKeys (obj): object {
    return Object.keys(obj);
  }

  createForm (): void {
    this.calculator = this.formBuilder.group({
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      formula: ['', Validators.required]
    });
  }

  createTdee (data): void {

    this.result = this.calcService.calculate(data);
  }

  updateUserData (formValues) {
    const {height, weight, age, gender} = formValues;
    const data: object = {
      height: height,
      weight: weight,
      age: age,
      gender: gender,
      bmr: this.result
    };

    this.subscription.add(this.userService.updateUserData(data).subscribe());
  }
}
