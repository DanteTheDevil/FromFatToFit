import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getUserId().subscribe(response => {
      this.userService.getUserData(response).subscribe(data => console.log(data));
    });
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }
}
