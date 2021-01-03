import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Gesuch} from '../../models/Gesuch';

@Injectable({
  providedIn: 'root'
})
export class GesuchService {
  /***
   * This service implements the CRUD of an Angebot.
   */
  gesuchCollection: AngularFirestoreCollection<Gesuch>;

  constructor(private afs: AngularFirestore) {
    this.gesuchCollection = afs.collection<Gesuch>('gesuche');
  }

  /**
   * copy and prepare
   * @param gesuch to prepare as Object
   */
  private static copyAndPrepare(gesuch: Gesuch): any {
    const copy = {...gesuch};
    delete copy._ID;

    copy.erstellerId = copy.erstellerId || null;
    copy.ankunftDatum = copy.ankunftDatum || null;
    copy.ankunftZeit = copy.ankunftZeit || null;
    copy.abfahrtStrasse = copy.abfahrtStrasse || null;
    copy.abfahrtOrt = copy.abfahrtOrt || null;
    copy.abfahrtPlz = copy.abfahrtPlz || null;
    copy.ankunftStrasse = copy.ankunftStrasse || null;
    copy.ankunftOrt = copy.ankunftOrt || null;
    copy.ankunftPlz = copy.ankunftPlz || null;
    copy.bezahlung = copy.bezahlung || null;
    copy.fahrtId = copy.fahrtId || null;
    copy.fahrer = copy.fahrer || [];
    copy.interessenten = copy.interessenten || [];
    copy.lieferobjektId = copy.lieferobjektId || null;

    return copy;
  }

  /**
   * This method creates a Observable of the Gesuch from Firebase
   * @return Observable<Gesuch[]> of the Gesuch in firebase
   */
  observableGesuch(): Observable<Gesuch[]> {
    const changeActions: Observable<DocumentChangeAction<Gesuch>[]> = this.gesuchCollection.snapshotChanges();
    return changeActions.pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data._ID = a.payload.doc.id;
          return data;
        })));
  }

  /**
   * This Method adds a Gesuch to firebase
   * @param gesuch is the Gesuch that will be added
   * @return Promise<{ gesuch: Gesuch, message: string } gesuch is the added gesuch, message Document written with ID: DocumentID
   */
  addGesuch(gesuch: Gesuch): Promise<{ gesuch: Gesuch, message: string }> {
    return new Promise((resolve, reject) => {
      this.gesuchCollection.add(GesuchService.copyAndPrepare(gesuch))
          .then((docRef) => {
            const resGesuch = gesuch;
            resGesuch._ID = docRef.id;
            resolve({gesuch: resGesuch, message: 'Document written with ID: ' + docRef.id});
          }).catch((error) => {
        reject('Error adding document: ' + error);
      });
    });
  }

  /**
   * This Method deletes a Gesuch in Firebase
   * @param gesuchId is the id of the Gesuch that will be deleted
   */
  deleteGesuch(gesuchId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.gesuchCollection.doc(gesuchId).delete()
          .then(async () => {
            resolve('Successfully deleted Document with ID: ' + gesuchId);
          }).catch((error) => {
        reject('Error deleting document: ' + error);
      });
    });
  }

  /**
   * This Method updates a Gesuch in Firebase
   * @param gesuch is the gesuch that will be updated in Firebase
   */
  updateGesuch(gesuch: Gesuch): Promise<{ gesuch: Gesuch, message: string }> {
    return new Promise((resolve, reject) => {
      const gesuchId = gesuch._ID;
      this.gesuchCollection.doc(gesuch._ID).update(GesuchService.copyAndPrepare(gesuch))
          .then(async () => {
            gesuch._ID = gesuchId;
            resolve({gesuch, message: 'Successfully edited Document with ID: ' + gesuch._ID});
          }).catch((error) => {
        reject('Error editing document: ' + error);
      });
    });
  }
}
