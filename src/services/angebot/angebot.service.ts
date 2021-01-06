import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Angebot} from '../../models/Angebot';
import {map} from 'rxjs/operators';
import {IError} from 'protractor/built/exitCodes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngebotService {
    /**
     * Filtervariablen
     */
    startort: string;
    zielort: string;
    endDate: string;

    /***
     * This service implements the CRUD of an Angebot.
     */
    angebotCollection: AngularFirestoreCollection<Angebot>;

    constructor(private afs: AngularFirestore,
                private router: Router) {
        this.angebotCollection = afs.collection<Angebot>('angebote');
    }

    /**
     * copy and prepare
     * @param angebot to prepare as Object
     */
    private static copyAndPrepare(angebot: Angebot): any {
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
        copy.kunden = copy.kunden || [];
        copy.interessenten = copy.interessenten || [];
        copy.fahrzeugId = copy.fahrzeugId || null;

        return copy;
    }

    /**
     * This method creates a Observable of the Angebote from Firebase
     * @return Observable<Angebot[]> of the Angebote in firebase
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

    /**
     * This Method adds a Angebot to firebase
     * @param angebot is the Angebot that will be added
     * @return Promise<{ angebot: Angebot, message: string } angebot is the added angebot, message Document written with ID: DocumentID
     */
    addAngebot(angebot: Angebot): Promise<{ angebot: Angebot, message: string }> {
        return new Promise((resolve, reject) => {
            this.angebotCollection.add(AngebotService.copyAndPrepare(angebot))
                .then((docRef) => {
                    const resAngebot = angebot;
                    resAngebot._ID = docRef.id;
                    resolve({angebot: resAngebot, message: 'Document written with ID: ' + docRef.id});
                }).catch((error) => {
                reject('Error adding document: ' + error);
            });
        });
    }

    deleteAngebot(angebotId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.angebotCollection.doc(angebotId).delete()
                .then(async () => {
                    resolve('Successfully deleted Document with ID: ' + angebotId);
                }).catch((error) => {
                reject('Error deleting document: ' + error);
            });
        });
    }

    updateAngebot(angebot: Angebot): Promise<{ angebot: Angebot, message: string }> {
        return new Promise((resolve, reject) => {
            const angebotId = angebot._ID;
            this.angebotCollection.doc(angebot._ID).update(AngebotService.copyAndPrepare(angebot))
                .then(async () => {
                    angebot._ID = angebotId;
                    resolve({angebot, message: 'Successfully edited Document with ID: ' + angebot._ID});
                }).catch((error) => {
                reject('Error editing document: ' + error);
            });
        });
    }

    startSearch(startort: string, zielort: string, abfahrtsdatum: string) {
        this.startort = startort;
        this.zielort = zielort;
        this.endDate = abfahrtsdatum;
        this.router.navigate(['/angebot']);
    }
}
