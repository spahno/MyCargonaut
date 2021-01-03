import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Lieferobjekt} from '../../models/Lieferobjekt';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {map} from 'rxjs/operators';
import {Gesuch} from '../../models/Gesuch';

@Injectable({
  providedIn: 'root'
})
export class LieferobjektService {

  objektCollection: AngularFirestoreCollection<Lieferobjekt>;

  constructor(private afs: AngularFirestore) {
    this.objektCollection = this.afs.collection<Lieferobjekt>('lieferObjekt');
  }

  static copyAndPrepare(lieferobjekt: Lieferobjekt): Lieferobjekt {
    const copy = {...lieferobjekt};
    delete copy._ID;
    return copy;
  }


  /**
   * Method to find a Lieferobjekt by id
   * @param objektId id of a lieferobjekt
   * @return Observable<Lieferobjekt> lieferobjekt that was found
   */
  findLieferobjektById(objektId: string): Observable<Lieferobjekt> {
    const changeAction = this.objektCollection.doc<Lieferobjekt>(objektId);
    return changeAction.snapshotChanges()
        .pipe(
            map(changes => {
              const data = changes.payload.data();
              if (data) {
                data._ID = objektId;
              }
              return {...data};
            }));
  }

  /**
   * This Method adds a Lieferobjekt to firebase
   * @param lieferobjekt is the Lieferobjekt that will be added
   * @return Promise<{ lieferobjekt: Lieferobjekt, message: string } lieferobjekt is the added lieferobjekt,
   * message Document written with ID: DocumentID
   */
  addLieferobjekt(lieferobjekt: Lieferobjekt): Promise<{ lieferobjekt: Lieferobjekt, message: string }> {
    return new Promise((resolve, reject) => {
      this.objektCollection.add(LieferobjektService.copyAndPrepare(lieferobjekt))
          .then((docRef) => {
            const resLieferobjekt = lieferobjekt;
            resLieferobjekt._ID = docRef.id;
            resolve({lieferobjekt: resLieferobjekt, message: 'Document written with ID: ' + docRef.id});
          }).catch((error) => {
        reject('Error adding document: ' + error);
      });
    });
  }

  /**
   * This Method deletes a Lieberobjekt in Firebase
   * @param objektId is the id of the Gesuch that will be deleted
   */
  deleteLieferobjekt(objektId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.objektCollection.doc(objektId).delete()
          .then(async () => {
            resolve('Successfully deleted Document with ID: ' + objektId);
          }).catch((error) => {
        reject('Error deleting document: ' + error);
      });
    });
  }
}
