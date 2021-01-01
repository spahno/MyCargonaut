import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Angebot} from '../../models/Angebot';
import {map} from 'rxjs/operators';
import {IError} from 'protractor/built/exitCodes';

@Injectable({
  providedIn: 'root'
})
export class AngebotService {
  /***
   * This service implements the CRUD of an Angebot.
   */
  angebotCollection: AngularFirestoreCollection<Angebot>;
  constructor(private afs: AngularFirestore) {
    this.angebotCollection = afs.collection<Angebot>('angebote');
  }

    /**
     * copy and prepare
     * @param angebot to prepare as Object
     */
    private static copyAndPrepare(angebot: Angebot): Angebot {
        const copy = {...angebot};
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
        copy.kunden = copy.kunden || null;
        copy.interessenten = copy.interessenten || null;
        copy.fahrzeugId = copy.fahrzeugId || null;

        return copy;
    }

  /**
   * This method creates a Observable of the Angebote from Firebase
   */
  observableAngebote(): Observable<Angebot[]> {
    const changeActions: Observable<DocumentChangeAction<Angebot>[]> = this.angebotCollection.snapshotChanges();
    return changeActions.pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data._ID = a.payload.doc.id;
          return data;
        })));
  }

  addAngebot(angebot: Angebot): Promise<{ angebote: Angebot[], message: string }> {
      return new Promise((resolve, reject) => {
          this.angebotCollection.add(AngebotService.copyAndPrepare(angebot))
              .then((docRef) => {
                  resolve({angebote: [new Angebot()], message: 'Document written with ID: ' + docRef.id});
              }).catch((error) => {
              reject('Error adding document: ' + error);
          });
      });
  }

  deleteAngebot(angebot: Angebot): Promise<{ angebote: Angebot[], message: string }> {
      return new Promise((resolve, reject) => {
          this.angebotCollection.doc(angebot._ID).delete()
              .then( async () => {
                  let tmpAngebote: Angebot[];
                  const sub = await this.observableAngebote().subscribe(data => {
                      tmpAngebote = data;
                  });
                  sub.unsubscribe();
                  resolve({angebote: tmpAngebote, message: 'Successfully deleted Document with ID: ' + angebot._ID});
              }).catch((error) => {
              reject('Error adding document: ' + error);
          });
      });
  }

}
