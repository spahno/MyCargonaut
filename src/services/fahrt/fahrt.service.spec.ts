import { TestBed } from '@angular/core/testing';

import { FahrtService } from './fahrt.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Fahrt} from '../../models/Fahrt';

describe('FahrtService', () => {
  let service: FahrtService;
  const addedFahrten: string[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(FahrtService);
  });

  afterAll(async () => {
    addedFahrten.forEach(fahrtId => {
      service.deleteFahrt(fahrtId).then(() => {
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
    const testFahrt = new Fahrt();
    let testId: string;
    it('Should start, get and update a Fahrt from Firebase', (done) => {
      service.startFahrt().then(res => {
        const resFahrt: Fahrt = res.fahrt;
        testId = res.fahrt._ID;
        addedFahrten.push(resFahrt._ID);
        expect(resFahrt._ID).toBeDefined();
        expect(res.message).toBeDefined();
        const updatedFahrt = new Fahrt();
        Object.assign(updatedFahrt, resFahrt);
        updatedFahrt.beendet = true;
        updatedFahrt.bewertung = 3;
        service.updateFahrt(updatedFahrt).then(res2 => {
          const updatedFahrtAfter = new Fahrt();
          Object.assign(updatedFahrtAfter, res2);
          expect(res2.fahrt._ID).toEqual(updatedFahrt._ID);
          expect(res2.fahrt.beendet).toEqual(true);
          expect(res2.fahrt.bewertung).toEqual(3);
          const sub = service.findFahrtById(res2.fahrt._ID).subscribe(data => {
            sub.unsubscribe();
            expect(data._ID).toEqual(testId);
            expect(data.beendet).toEqual(true);
            expect(data.bewertung).toEqual(3);
            done();
          });
        }).catch(err => {
          console.error('Test update Fahrt Document failed. Error: ' + err);
        });
      }).catch(err => {
        console.error('Test get Fahrt Document failed. Error: ' + err);
      });
    });
  });
  it('Test end a Fahrt', async (done) => {
    service.startFahrt().then(res => {
      const testfahrt = res.fahrt;
      addedFahrten.push(testfahrt._ID);
      service.endFahrt(testfahrt._ID).then(res2 => {
        expect(res2.beendet).toBeTrue();
        done();
      }).catch(err => console.error('Failed ending a Fahrt. Error: ' + err));
    });
  });

  it('Test bewertungen', (done) => {
    service.startFahrt().then(res => {
      const testfahrt = res.fahrt;
      addedFahrten.push(testfahrt._ID);
      service.fahrtBewerten(testfahrt._ID, 4).then(res2 => {
        expect(res2.bewertung).toEqual(4);
        expect(res2.anzahlBewertungen).toEqual(1);
        service.fahrtBewerten(testfahrt._ID, 5).then(res3 => {
          expect(res3.bewertung).toEqual(4.5);
          expect(res3.anzahlBewertungen).toEqual(2);
          done();
        });
      }).catch(err => console.error('Failed ending a Fahrt. Error: ' + err));
    });
  });

  it('Test bewertungen fail', (done) => {
    service.startFahrt().then(res => {
      const testfahrt = res.fahrt;
      addedFahrten.push(testfahrt._ID);
      service.fahrtBewerten(testfahrt._ID, 6)
          .catch(err => {
            expect(err).toEqual('Bewertung must be between 0 and 5.');
            done();
          });
    });
  });
});
