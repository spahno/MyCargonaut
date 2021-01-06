import { TestBed } from '@angular/core/testing';

import { GesuchService } from './gesuch.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Gesuch, InteressentG} from '../../models/Gesuch';
import {RouterTestingModule} from '@angular/router/testing';

describe('GesuchService', () => {
  let service: GesuchService;
  const addedGesuche: string[] = [];
  const gesuch1: Gesuch = new Gesuch();
  gesuch1.ankunftDatum = '17.12.2020';
  gesuch1.ankunftZeit = '17:12 Uhr';
  gesuch1.abfahrtStrasse = 'Gießenerstraße 299';
  gesuch1.abfahrtPlz = '35390';
  gesuch1.abfahrtOrt = 'Gießen';
  gesuch1.ankunftStrasse = 'Berlinerstraße 399';
  gesuch1.ankunftPlz = '10201';
  gesuch1.ankunftOrt = 'Berlin';
  gesuch1.bezahlung = '30€ VB';

  const gesuche2: Gesuch = new Gesuch();
  gesuche2.ankunftDatum = '18.12.2020';
  gesuche2.ankunftZeit = '18:12 Uhr';
  gesuche2.abfahrtStrasse = 'Heidelbergerstraße 299';
  gesuche2.abfahrtPlz = '69120';
  gesuche2.abfahrtOrt = 'Heidelberg';
  gesuche2.ankunftStrasse = 'Konstanzerstraße 399';
  gesuche2.ankunftPlz = '80923';
  gesuche2.ankunftOrt = 'Konstanz';
  gesuche2.bezahlung = '30€ Pro 1m^3';

  const interessent: InteressentG = new InteressentG();
  interessent.userId = 'userTestId';
  interessent.fahrzeugId = 'fahrerTestId';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule, RouterTestingModule
      ]
    });
    service = TestBed.inject(GesuchService);
  });

  afterAll(async () => {
    addedGesuche.forEach(gesuch => {
      service.deleteGesuch(gesuch).then(() => {
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
    it('Should get from Firebase', async (done) => {
      const subGesuche = await service.observableGesuch().subscribe(data => {
        subGesuche.unsubscribe();
        expect(data).toBeDefined();
        done();
      });
    });

    it('Should add gesuche to Firebase', async (done) => {
      let gesucheBefore: Gesuch[];
      let gesucheAfter: Gesuch[];
      let addedGesuch1: Gesuch;
      let addedGesuch2: Gesuch;
      const subGesuche = await service.observableGesuch().subscribe(async data => {
        gesucheBefore = data;
        expect(gesucheBefore).toBeDefined();
      });
      subGesuche.unsubscribe();
      await service.addGesuch(gesuch1)
          .then(async res => {
            addedGesuch1 = res.gesuch;
            expect(res.message).toBeDefined();
            expect(res.gesuch.bezahlung).toBe(gesuch1.bezahlung);
            addedGesuche.push(res.gesuch._ID);
          }).catch(err => {
            console.log(err);
          });
      await service.addGesuch(gesuche2)
          .then(async res => {
            addedGesuch2 = res.gesuch;
            expect(res.message).toBeDefined();
            expect(res.gesuch.bezahlung).toBe(gesuche2.bezahlung);
            addedGesuche.push(res.gesuch._ID);
          }).catch(err => {
            console.log(err);
          });
      const sub2 = await service.observableGesuch().subscribe(data => {
        sub2.unsubscribe();
        gesucheAfter = data;
        expect(gesucheAfter.length).toBe(gesucheBefore.length + 2);
        expect(service.addGesuch).toHaveBeenCalledTimes(2);
      });
      done();
    });

    describe('Test update Gesuch on Firebase', () => {
      it('update bezahlung', (done) => {
        let addedGesuch1 = new Gesuch();
        service.addGesuch(gesuch1)
            .then(res => {
              addedGesuch1 = res.gesuch;
              expect(res.message).toBeDefined();
              expect(res.gesuch.bezahlung).toBe(gesuch1.bezahlung);
              addedGesuche.push(res.gesuch._ID);
              addedGesuch1.bezahlung = 'Test €';
              service.updateGesuch(addedGesuch1).then(res2 => {
                expect(res2.gesuch._ID).toEqual(addedGesuch1._ID);
                expect(res2.gesuch.bezahlung).toEqual('Test €');
                done();
              });
            }).catch(err => {
          console.log(err);
        });
      });
      it('CRUD Interessenten', (done) => {
        let interesseGesuchBefore: Gesuch;
        const interesseGesuchAfter = new Gesuch();
        service.addGesuch(gesuch1)
            .then(res => {
              interesseGesuchBefore = res.gesuch;
              expect(res.message).toBeDefined();
              expect(res.gesuch.bezahlung).toBe(gesuch1.bezahlung);
              addedGesuche.push(res.gesuch._ID);
              service.updateGesuch(interesseGesuchBefore.addInteressent(interessent)).then(res2 => {
                expect(res2.gesuch._ID).toEqual(interesseGesuchBefore._ID);
                expect(res2.gesuch.getInteressenten()[0].userId).toEqual(interessent.userId);
                Object.assign(interesseGesuchAfter, res2.gesuch);
                service.updateGesuch(res2.gesuch.deleteInteressent(interessent)).then(res3 => {
                  expect(res3.gesuch.getInteressenten().length).toEqual(interesseGesuchAfter.getInteressenten().length - 1);
                  done();
                });
              });
            }).catch(err => {
          console.log(err);
        });
      });
    });
  });
});
