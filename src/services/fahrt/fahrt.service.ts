import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Lieferobjekt} from '../../models/Lieferobjekt';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Fahrt} from '../../models/Fahrt';

@Injectable({
  providedIn: 'root'
})
/***
 * This service organises the start and end of an offer (Angebot/Gesuch).
 */
export class FahrtService {
  fahrtCollection: AngularFirestoreCollection<Fahrt>;

  constructor(private afs: AngularFirestore) {
    this.fahrtCollection = this.afs.collection<Fahrt>('fahrt');
  }

  static copyAndPrepare(fahrt: Fahrt): Fahrt {
    const copy = {...fahrt};
    delete copy._ID;
    return copy;
  }


  /**
   * Method to find a Fahrt by id
   * @param fahrtId id of a Fahrt
   * @return Observable<Lieferobjekt> lieferobjekt that was found
   */
  findFahrtById(fahrtId: string): Observable<Fahrt> {
    const changeAction = this.fahrtCollection.doc<Fahrt>(fahrtId);
    return changeAction.snapshotChanges()
        .pipe(
            map(changes => {
              const data = changes.payload.data();
              if (data) {
                data._ID = fahrtId;
              }
              return {...data};
            }));
  }

  /**
   * This Method adds a Fahrt to firebase
   * @return Promise<{ lieferobjekt: Lieferobjekt, message: string } lieferobjekt is the added lieferobjekt,
   * message Document written with ID: DocumentID
   */
  startFahrt(): Promise<{ fahrt: Fahrt, message: string }> {
    return new Promise((resolve, reject) => {
      this.fahrtCollection.add(FahrtService.copyAndPrepare(new Fahrt()))
          .then((docRef) => {
            const resFahrt = new Fahrt();
            resFahrt._ID = docRef.id;
            resolve({fahrt: resFahrt, message: 'Document written with ID: ' + docRef.id});
          }).catch((error) => {
        reject('Error adding document: ' + error);
      });
    });
  }

  /**
   * This Method update a Fahrt in firebase
   * @return Promise<{ fahrt: Fahrt, message: string } fahrt is the added fahrt,
   * message Document written with ID: DocumentID
   */
  updateFahrt(fahrt: Fahrt): Promise<{ fahrt: Fahrt, message: string }> {
    return new Promise((resolve, reject) => {
      const fahrtId = fahrt._ID;
      this.fahrtCollection.doc(fahrtId).update(FahrtService.copyAndPrepare(fahrt))
          .then(async () => {
            fahrt._ID = fahrtId;
            resolve({fahrt, message: 'Successfully edited Document with ID: ' + fahrtId});
          }).catch((error) => {
        reject('Error editing document: ' + error);
      });
    });
  }

    /**
     * This method end a fahrt and saves it in Firebase
     * @param fahrtId is the fahrtId of the ended fahrt
     */
  endFahrt(fahrtId: string): Promise<Fahrt> {
      return new Promise((resolve, reject) => {
          const sub = this.findFahrtById(fahrtId).subscribe(resFahrt => {
              sub.unsubscribe();
              resFahrt.beendet = true;
              this.updateFahrt(resFahrt).then(res => {
                  resolve(res.fahrt);
              }).catch(err => reject(err));
          });
      });
  }

    /**
     * This method adds a bewertung to a fahrt to firebase
     * @param fahrtId is the id of a Fahrt
     * @param bewertung is the new bewertung that will be added
     */
  fahrtBewerten(fahrtId: string, bewertung: number): Promise<Fahrt> {
      return new Promise((resolve, reject) => {
          if (bewertung > 5) {
              reject('Bewertung must be between 0 and 5.');
          } else {
              const sub = this.findFahrtById(fahrtId).subscribe(data => {
                  sub.unsubscribe();
                  if (data.anzahlBewertungen === 0) {
                      data.bewertung = bewertung;
                      data.anzahlBewertungen++;
                  } else {
                      data.bewertung = ((data.bewertung * data.anzahlBewertungen) + bewertung) / (data.anzahlBewertungen + 1);
                      data.anzahlBewertungen++;
                  }
                  this.updateFahrt(data).then(res => {
                      resolve(res.fahrt);
                  }).catch(err => reject(err));
              });
          }
      });
  }

  /**
   * This Method deletes a Fahrt in Firebase
   * @param fahrtId is the id of the Fahrt that will be deleted
   */
  deleteFahrt(fahrtId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fahrtCollection.doc(fahrtId).delete()
          .then(async () => {
            resolve('Successfully deleted Document with ID: ' + fahrtId);
          }).catch((error) => {
        reject('Error deleting document: ' + error);
      });
    });
  }
}
