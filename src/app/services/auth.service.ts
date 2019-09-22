import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BaseService } from './base.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    super();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          return of(user);
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  signIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // const credentials = await this.afAuth.auth.signInWithPopup(
    //   new auth.GoogleAuthProvider()
    // );
    // return this.updateUser(credentials.user);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
