import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Fahrzeug} from '../../models/fahrzeug';

@Injectable({
  providedIn: 'root'
})
export class FahrzeugService {

  fahrzeugCollection: AngularFirestoreCollection<Fahrzeug>;

  constructor(private afs: AngularFirestore) {
    this.fahrzeugCollection = this.afs.collection<Fahrzeug>('fahrzeug');
  }

  static copyAndPrepare(fahrzeug: Fahrzeug): Fahrzeug {
    const copy = {...fahrzeug};
    delete copy.id;
    return copy;
  }


  /**
   * Method to find a Fahrzeug by id
   * @param fahrzeugId id of a Fahrzeug
   * @return Observable<Fahrzeug> Fahrzeug that was found
   */
  findFahrzeugById(fahrzeugId: string): Observable<Fahrzeug> {
    const changeAction = this.fahrzeugCollection.doc<Fahrzeug>(fahrzeugId);
    return changeAction.snapshotChanges()
        .pipe(
            map(changes => {
              const data = changes.payload.data();
              if (data) {
                data.id = fahrzeugId;
              }
              return {...data};
            }));
  }

  /**
   * This Method adds a Fahrzeug to firebase
   * @param fahrzeug is the Fahrzeug that will be added
   * @return Promise<{ fahrzeug: Fahrzeug, message: string } fahrzeug is the added Fahrzeug,
   * message Document written with ID: DocumentID
   */
  addFahrzeug(fahrzeug: Fahrzeug): Promise<{ fahrzeug: Fahrzeug, message: string }> {
    return new Promise((resolve, reject) => {
      this.fahrzeugCollection.add(FahrzeugService.copyAndPrepare(fahrzeug))
          .then((docRef) => {
            const resFahrzeug = fahrzeug;
            resFahrzeug.id = docRef.id;
            resolve({fahrzeug: resFahrzeug, message: 'Document written with ID: ' + docRef.id});
          }).catch((error) => {
        reject('Error adding document: ' + error);
      });
    });
  }

  /**
   * This Method deletes a Fahrzeug in Firebase
   * @param fahrzeugId is the id of the Fahrzeug that will be deleted
   */
  deleteFahrzeug(fahrzeugId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fahrzeugCollection.doc(fahrzeugId).delete()
          .then(async () => {
            resolve('Successfully deleted Document with ID: ' + fahrzeugId);
          }).catch((error) => {
        reject('Error deleting document: ' + error);
      });
    });
  }
}
