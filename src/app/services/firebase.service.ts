import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService extends BaseService {

  private entityDoc: AngularFirestoreDocument<Record>;
  private entityCol: AngularFirestoreCollection<Record>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    super();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.entityDoc = this.afs.collection('records').doc(user.uid);
        this.entityCol = this.entityDoc.collection<Record>('items');
      }
    });
  }

  getRecords(): Observable<any> {
    return this.entityCol.valueChanges();
  }

  save(data: any): void {
    this.entityCol.add(data).then(function() {
      console.log("data saved successfully");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  
}
