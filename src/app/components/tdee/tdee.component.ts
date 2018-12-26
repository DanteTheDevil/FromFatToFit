import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  selector: 'app-tdee',
  templateUrl: './tdee.component.html',
  styleUrls: ['./tdee.component.scss']
})
export class TdeeComponent {
  calculator: FormGroup;
  activities: object = {
    'bmr': 'Basic metabolism rate',
    'sedentary': 'Sedentary (No exercise)',
    'light': 'Light (3 times/week)',
    'modern': 'Moderate (5 times/week)',
    'heavy': 'Heavy (Exercise everyday)'
  };
  formulas: object = {
    'harris': 'Harris-Benedict',
    'who': 'World Health Organization',
    'mifflin': 'Mifflin-St. Jeor'
  };
  constructor(private formBuilder: FormBuilder, private calcService: CalculatorService) {
    this.createForm();
  }
  getKeys (obj) {
    return Object.keys(obj);
  }
  createForm () {
    this.calculator = this.formBuilder.group({
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      activity: ['', Validators.required],
      formula: ['', Validators.required]
    });
  }
  createTdee (data) {
    console.log(this.calcService.calculate(data));
  }
}
