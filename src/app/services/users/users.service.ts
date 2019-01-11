import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/User';

@Injectable()

export class UsersService {
  constructor(private afDb: AngularFireDatabase, private authService: AuthService) {

  }

  getUserData (): Observable<any> {
    const uid = this.authService.getUserId();

    if (uid) {
      return from(this.afDb.list(`users`).valueChanges())
        .pipe(
          map(response => {
            return response.filter((data: User) => data.uid === uid);
          })
        );
    }
    return new Observable;
  }

  updateUserData (data): Observable<any> {
    const uid = this.authService.getUserId();

    return from(this.afDb.list('users').update(uid, data));
  }

  updateUserActivities (data): Observable<any> {
    const uid = this.authService.getUserId();
    const {name} = data;

    return from(this.afDb.list(`users/${uid}/activities`).set(name, data));
  }

  deleteUserActivity (userActivity) {
    const uid = this.authService.getUserId();

    return from(this.afDb.list(`users/${uid}/activities`).remove(userActivity));
  }

  deleteUserAllActivities () {
    const uid = this.authService.getUserId();

    return from(this.afDb.list(`users/${uid}`).remove('activities'));
  }
}
