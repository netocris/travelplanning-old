import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { IUserSettings } from '../models/i-user-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseService {

  private entityCol: AngularFirestoreCollection<IUserSettings>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.entityCol = this.afs.collection(`settings`);
  }

  /**
   * get records
   */
  getSettings(id: string): Observable<IUserSettings> {
    return this.entityCol.doc<IUserSettings>(id).valueChanges();
  }

  /**
   * save settings
   *
   * @param data data
   */
  save(data: IUserSettings): void {
    const toSave = {
      uid: data.uid,
      lang: data.lang,
      darkMode: data.darkMode
    };
    this.entityCol.doc(data.uid).set(toSave, {merge: true});
  }

}
