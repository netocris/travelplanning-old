import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BaseService } from './base.service';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  user: Observable<IUser>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async signIn() {
    const credentials = await this.afAuth.auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
    return this.updateUser(credentials.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

  private updateUser(user: import('firebase').User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

}
