import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as firebase from "firebase/app";
import "firebase/auth";


import { AppService } from './services/app.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DAEMONTHREAD.COM';
  googleAuthProvider: firebase.auth.GoogleAuthProvider;

  constructor(public appService: AppService) {
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.googleAuthProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    firebase.auth().useDeviceLanguage();
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  public googleSignin() {
    firebase.auth().signInWithPopup(this.googleAuthProvider)
      .then((result: firebase.auth.UserCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.dir(user);

      }).catch((error) => {
        // Handle Errors here.
        console.error(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

      });
  }

  public signout() {
    firebase.auth().signOut().then(function () {
      console.log("Logout successfully!");
    }).catch(function (error) {
      // An error happened.
      console.error(error);
    });

  }


}
