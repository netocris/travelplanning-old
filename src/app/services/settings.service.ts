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
   * @param id id
   * @param lang lang
   * @param darkMode darkMode
   */
  save(id: string, language: string, darkMode: boolean): void {
    const data = {
      id: id,
      language: language,
      darkMode: darkMode
    };
    this.entityCol.doc<IUserSettings>(id).set(data, {merge: true});
  }

}
