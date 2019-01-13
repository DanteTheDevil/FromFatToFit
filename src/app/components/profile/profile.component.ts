import { Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { AuthService} from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private readonly userInfo: User;
  private userActivities: any[];
  private totalCalories: number;

  constructor(private userService: UsersService, private authService: AuthService) {
    this.userInfo = {
      age: 0,
      gender: '',
      weight: 0,
      height: 0,
      bmr: 0
    };
    this.userActivities = [];
    this.totalCalories = 0;
  }

  checkUserInfo (): boolean {
    return Object.values(this.userInfo).every(value => Boolean(value) !== false);
  }

  checkActivitiesLength (): number {
    return Object.keys(this.userActivities).length;
  }

  deleteActivity (activityName): void {
    this.subscription.add(this.userService.deleteUserActivity(activityName).subscribe());
  }

  deleteAllActivities (): void {
    this.subscription.add(this.userService.deleteUserAllActivities().subscribe());
  }

  ngOnInit(): void {
    this.subscription.add(this.authService.userId$.subscribe(response => {
      this.userService.getUserData().subscribe(data => {
        const newUserInfo: User = data[0];

        this.totalCalories = newUserInfo.bmr;
        if (newUserInfo.activities) {
          this.userActivities = [];
          for (const value of Object.values(newUserInfo.activities)) {
            this.userActivities.push(value);
            this.totalCalories += value.calories;
          }
        } else {
          this.userActivities = [];
        }
        for (const key of Object.keys(this.userInfo)) {
          if (this.userInfo.hasOwnProperty(key) && newUserInfo.hasOwnProperty(key)) {
            this.userInfo[key] = newUserInfo[key];
          }
        }
      });
    }));
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }
}
