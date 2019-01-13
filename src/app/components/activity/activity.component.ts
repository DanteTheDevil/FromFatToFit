import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit, OnDestroy {
  public name: string;
  public calories: number;
  private subscription: Subscription = new Subscription();
  public result: number;
  public calculator: FormGroup;

  constructor(private route: ActivatedRoute, private activitiesService: ActivitiesService, private formBuilder: FormBuilder,
              private userService: UsersService) {
    this.createForm();
    this.result = 0;
  }

  createForm(): void {
    this.calculator = this.formBuilder.group({
      weight: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription
      .add(this.route.params.subscribe((params: Params) => {
        this.name = params['name'];
      }))
      .add(this.activitiesService.getData().subscribe(response => {
        const currentActivity = response.find(item => item.name === this.name);

        this.calories = currentActivity.calories;
      }));
  }
  calculateCalories(values): void {
    const {weight, duration} = values;

    this.result = Math.floor(this.calories * weight * duration / 60);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUserActivities (formValues) {
    const {duration} = formValues;
    const data = {
      name: this.name,
      duration: duration,
      calories: this.result
    };
    this.subscription.add(this.userService.updateUserActivities(data).subscribe());
  }
}
