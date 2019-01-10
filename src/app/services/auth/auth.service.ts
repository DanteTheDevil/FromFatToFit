import { Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject, from, Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {User} from '../../interfaces/user';

@Injectable ()

export class AuthService {
  private uToken: string | null;
  private uId = new BehaviorSubject<string>('');

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router, private afDb: AngularFireDatabase) {

  }

  updateUserId (newId): void {
    console.log(newId);
    this.uId.next(newId);
  }

  setUserToken (token): void {
    this.uToken = token;
  }

  isAuthenticated (): boolean {
    return this.uToken !== null;
  }

  logOut (): Observable<void> {
    return new Observable<void>(observer => {
      if (this.afAuth.user) {
        this.afAuth.auth.signOut();
        this.setUserToken(null);
      }
      observer.next();
    });
  }

  getUserId (): BehaviorSubject<string> {
    return this.uId;
  }

  createData (uid) {
    const newUser: User = {
      uid: uid,
      gender: '',
      age: 0,
      height: 0,
      bmr: 0,
      weight: 0
    };

    return this.afDb.list('users').set(uid, newUser);
  }

  createUser (value): Observable<any> {
    const {email, password} = value;

    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(
        switchMap(response => {
          const {uid} = response.user;

          this.updateUserId(uid);
          return from(response.user.getIdToken());
        }),
        map(response => {
          this.setUserToken(response);
          this.router.navigate(['profile']);

          return this.createData(this.uId);
        })
      );
  }

  loginWithEmail (value): Observable<any> {
    const { email, password } = value;

    return from(firebase.auth().signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap(response => {
          const {uid} = response.user;

          this.updateUserId(uid);
          return from(response.user.getIdToken());
        }),
        map(response => {
          this.setUserToken(response);
          this.router.navigate(['profile']);
        })
      );
  }

  loginWithSocial (type): Observable<any> {
    let provider;

    switch (type) {
      case 'facebook': {
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      }
      case 'google': {
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      }
    }

    return from(this.afAuth.auth
      .signInWithPopup(provider))
      .pipe(
        switchMap(response => {
          const {uid} = response.user;

          this.updateUserId(uid);
          return from(response.user.getIdToken());
        }),
        switchMap(response => {
          this.setUserToken(response);
          this.router.navigate(['profile']);
          return this.createData(this.uId);
        })
      );
  }
}
