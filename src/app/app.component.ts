import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from './services/activities/activities.service';
import { AuthService } from './services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import {UsersService} from './services/users/users.service';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private activitiesService: ActivitiesService, private authService: AuthService, private afAuth: AngularFireAuth,
              private userService: UsersService) {

  }

  ngOnInit(): void {
    this.subscription = this.afAuth.idToken.subscribe((response: string) => {

      this.authService.setUserToken(response);
    })
      .add(this.afAuth.user.subscribe(response => {
        const uId = response !== null ? response.uid : null;

        this.authService.updateUserId(uId);
      }))
      .add(this.activitiesService.fetchData().subscribe(response => {
        this.activitiesService.updateData(response);
      }));
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}

