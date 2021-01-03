import { TestBed } from '@angular/core/testing';

import { LieferobjektService } from './lieferobjekt.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Gesuch} from '../../models/Gesuch';
import {Lieferobjekt} from '../../models/Lieferobjekt';

describe('LieferobjektService', () => {
  let service: LieferobjektService;
  const addedLieferobjekte: string[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(LieferobjektService);
  });

  afterAll(async () => {
    addedLieferobjekte.forEach(objektId => {
      service.deleteLieferobjekt(objektId).then(() => {
        console.log('TestBed Successfully reset');
      }).catch(err => {
        console.log('Failed reset TestBed. Error: ' + err);
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Firebase', () => {
    const testObjekt = new Lieferobjekt();
    testObjekt.beschreibung = 'Test beschreibung';
    testObjekt.name = 'Test Objekt';
    testObjekt.preis = 'Test Preis';
    it('Should add and get Lieferobjekt from Firebase', async (done) => {
      service.addLieferobjekt(testObjekt).then(res => {
        const resLieferobjekt: Lieferobjekt = res.lieferobjekt;
        addedLieferobjekte.push(resLieferobjekt._ID);
        expect(resLieferobjekt.name).toEqual(testObjekt.name);
        expect(resLieferobjekt.beschreibung).toEqual(testObjekt.beschreibung);
        expect(resLieferobjekt.preis).toEqual(testObjekt.preis);
        expect(res.message).toBeDefined();
        const sub = service.findLieferobjektById(resLieferobjekt._ID).subscribe(data => {
          sub.unsubscribe();
          expect(data._ID).toEqual(resLieferobjekt._ID);
          expect(data.name).toEqual(resLieferobjekt.name);
          expect(data.beschreibung).toEqual(resLieferobjekt.beschreibung);
          expect(data.preis).toEqual(resLieferobjekt.preis);
          done();
        });
      }).catch(err => {
        console.error('Test get Lieferobjekt Document failed. Error: ' + err);
      });
    });
    it('Should fail to get Lieferobjekt from Firebase', async (done) => {
      const sub = service.findLieferobjektById('fehlendeId').subscribe(err => {
        sub.unsubscribe();
      });
      // Todo: Test failure
      done();
    });
  });
});
