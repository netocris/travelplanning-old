import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { IRecord } from '../models/i-record';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends BaseService {

  private entityDoc: AngularFirestoreDocument<IRecord>;
  private entityCol: AngularFirestoreCollection<IRecord>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.entityDoc = this.afs.collection('records').doc(user.uid);
        this.entityCol = this.entityDoc.collection<IRecord>('items');
      }
    });
  }

  getRecordsSnap() {
    return this.entityCol.snapshotChanges();
  }

  getRecords(): Observable<IRecord[]> {
    return this.entityCol.valueChanges();
  }

  getRecordById(id: string): Observable<IRecord> {
    return this.entityCol.doc<IRecord>(id).valueChanges();
  }

  getRecordByIdSnap(id: string) {
    return this.entityCol.doc<IRecord>(id).snapshotChanges();
  }

  save(data: IRecord): void {
    this.entityCol.add(data).then(function() {
      console.log("data saved successfully");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

}
