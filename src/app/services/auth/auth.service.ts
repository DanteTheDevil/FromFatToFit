import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable ()
export class AuthService{
  private token: string;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
  }
  isAuthenticated (): boolean {
    return this.token !== null;
  }
  logOut () {
    return new Promise<any>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.token = null;
        localStorage.removeItem('token');
        resolve();
      } else {
        reject();
      }
    });
  }
  saveToken (token) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  createUser (value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(response => {
          resolve(response);
        }, error => reject(error));
    });
  }
  loginWithEmail (value) {
    const { email, password } = value;

    return from(firebase.auth().signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap(response => from(response.user.getIdToken())),
        map(response => {
          this.saveToken(response);
          this.router.navigate(['profile']);
          console.log(response);
        })
      );
  }
  loginWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();

    return from(this.afAuth.auth
      .signInWithPopup(provider))
      .pipe(
        switchMap(response => from(response.user.getIdToken())),
        map(response => {
          this.saveToken(response);
          this.router.navigate(['profile']);
          console.log(response);
        })
      );
  }
  loginWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider();

    return from(this.afAuth.auth
      .signInWithPopup(provider))
      .pipe(
        switchMap(response => from(response.user.getIdToken())),
        map(response => {
          this.saveToken(response);
          this.router.navigate(['profile']);
          console.log(response);
        })
      );
  }
}
