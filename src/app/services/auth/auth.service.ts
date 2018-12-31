import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable ()
export class AuthService {
  private token: string;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  createData() {
    return this.http.post('https://from-fat-to-fit.firebaseio.com/data.json', {
      name: 'likle',
      email: 'dr.likle@gmail.com'
    });
  }
  isAuthenticated (): boolean {
    return this.token !== null;
  }
  logOut () {
    this.token = null;
    localStorage.removeItem('token');
  }
  saveToken (token) {
    this.token = token;
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('ahah'));
  }
  createUser (value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(response => {
          console.log(response);
          resolve(response);
        }, error => reject(error));
    });
  }
  loginWithEmail (value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(response => {
        resolve(response);
      }, error => reject(error));
    });
  }
  loginWithGoogle () {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();

      this.afAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          const token: string = response.credential.idToken;

          this.saveToken(token);
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

      this.afAuth.auth
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
