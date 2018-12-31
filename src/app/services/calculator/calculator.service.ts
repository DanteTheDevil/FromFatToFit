import { Injectable } from '@angular/core';

@Injectable ()

export class CalculatorService {
  constructor() {}

  calculate (data) {
    const {formula} = data;

    switch (formula) {
      case 'harris': return Math.round(this.harrisFormula(data));
      case 'who': return Math.round(this.whosFormula(data));
      case 'mifflin': return Math.round(this.mifflinsFormula(data));
      case 'owen': return Math.round(this.owensFormula(data));
    }
  }

  harrisFormula (data): number {
    const {age, gender, height, weight} = data;

    switch (gender) {
      case 'male': return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      case 'female': return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  }
  owensFormula (data): number {
    const {gender, weight} = data;

    switch (gender) {
      case 'male': return 879 + (10.2 * weight);
      case 'female': return 795 + (7.2 * weight);
    }
  }

  whosFormula (data): number {
    const {age, gender, weight} = data;

    if (gender === 'male') {
      switch (true) {
        case (age <= 9): return 22.7 * weight + 495;
        case (age >= 10 && age <= 17): return 17.5 * weight + 651;
        case (age >= 18 && age <= 29): return 15.3 * weight + 679;
        case (age >= 30 &&  age <= 60): return 11.6 * weight + 879;
        case (age > 60): return 13.5 * weight + 487;
        default: return 0;
      }
    } else if (gender === 'female') {
      switch (true) {
        case (age <= 9): return 22.5 * weight + 499;
        case (age >= 10 && age <= 17): return 12.2 * weight + 746;
        case (age >= 18 && age <= 29): return 14.7 * weight + 496;
        case (age >= 30 &&  age <= 60): return 8.7 * weight + 829;
        case (age > 60): return 10.5 * weight + 596;
        default: return 0;
      }
    }
  }

  mifflinsFormula (data): number {
    const {age, gender, height, weight} = data;

    switch (gender) {
      case 'male': return (10 * weight) + (6.25 * height) - (5 * age) + 5;
      case 'female': return (10 * weight) + (6.25 * height) - (5 * age) - 151;
    }
  }
}
