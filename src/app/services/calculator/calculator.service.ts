import { Injectable } from '@angular/core';

@Injectable ()

export class CalculatorService {
  activityLevel: object = {
    'bmr': 1,
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'heavy': 1.725
  };
  constructor() {}

  calculate (data) {
    const {formula} = data;

    switch (formula) {
      case 'harris': return this.harrisFormula(data);
      case 'who': return this.whosFormula(data);
      case 'mifflin': this.mifflinsFormula(data);
    }
  }

  harrisFormula (data) {
    const {age, gender, height, weight, activity} = data;
    console.log(data);
    switch (gender) {
      case 'male': return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * this.activityLevel[activity];
      case 'female': return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * this.activityLevel[activity];
    }
  }

  whosFormula (data) {
    return console.log('whos works');
  }

  mifflinsFormula (data) {
    const {age, gender, height, weight, activity} = data;
    console.log(data);
    console.log(((10 * weight) + (6.25 * height) - (5 * age) + 5) * this.activityLevel[activity]);
    switch (gender) {
      case 'male': return ((10 * weight) + (6.25 * height) - (5 * age) + 5) * this.activityLevel[activity];
      case 'female': return ((10 * weight) + (6.25 * height) - (5 * age) - 151) * this.activityLevel[activity];
    }
  }
}
