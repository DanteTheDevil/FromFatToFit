import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth) { }
  createUser (value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(response => resolve(response), error => reject(error));
    });
  }
  loginWithEmail (value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(response => resolve(response), error => reject(error));
    });
  }
  loginWithGoogle () {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();

      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          resolve(response);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
  loginWithFacebook () {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();

      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          resolve(response);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }
}
