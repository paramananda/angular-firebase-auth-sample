import { Injectable, NgZone } from '@angular/core';

import * as firebase from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public authUser: firebase.User;

  constructor(private ngZone: NgZone) {
    this.registerAuthChnageListener();
  }

  private registerAuthChnageListener() {
    firebase.auth().onAuthStateChanged((user) => {
      this.ngZone.run(()=>{
        if (user) {
          this.authUser = user;
        } else {
          this.authUser = null;
        }
      })
    });
  }
}
