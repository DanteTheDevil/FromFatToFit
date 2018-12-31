import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent {
  calculator: FormGroup;
  formulas: object = {
    'harris': 'Harris-Benedict',
    'who': 'World Health Organization',
    'mifflin': 'Mifflin-St. Jeor',
    'owen': 'Owen'
  };
  result: any;
  constructor(private formBuilder: FormBuilder, private calcService: CalculatorService) {
    this.createForm();
    this.result = null;
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
      formula: ['', Validators.required]
    });
  }
  createTdee (data) {

    this.result = this.calcService.calculate(data);
    console.log(this.calcService.calculate(data));
}
}
