import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { IRecord } from '../models/i-record';
import { Action } from 'rxjs/internal/scheduler/Action';

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

  /**
   * get records
   */
  getRecordsSnap() {
    return this.entityCol.snapshotChanges();
  }

  /**
   * get records
   */
  getRecords(): Observable<IRecord[]> {
    return this.entityCol.valueChanges();
  }

  /**
   * get record
   *
   * @param id record id
   */
  getRecordById(id: string): Observable<IRecord> {
    return this.entityCol.doc<IRecord>(id).valueChanges();
  }

  /**
   * get record
   *
   * @param id record id
   */
  getRecordByIdSnap(id: string) {
    return this.entityCol.doc<IRecord>(id).snapshotChanges();
  }

  /**
   * save record
   *
   * @param data data
   */
  save(data: any): void {
    this.entityCol.add(data)
      .then(function() {
        console.log("data saved successfully");
      })
      .catch(function(error) {
        console.error("ERROR: saving document", error);
      });
  }

  /**
   * edit record
   *
   * @param id record id
   * @param data data
   */
  edit(id: string, data: any): void {
    this.entityCol.doc(id).set(data)
      .then(function() {
        console.log("data edited successfully");
      })
      .catch(function(error) {
        console.error("ERROR: editing document", error);
      });
  }

  /**
   * delete record
   *
   * @param id record id
   */
  delete(id: string) {
    this.entityCol.doc(id).delete()
      .then(function(){
        console.log("record deleted successfully");
      })
      .catch(function(error){
        console.error("ERROR: deleting document", error);
      });
  }

}
