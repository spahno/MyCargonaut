import { TestBed } from '@angular/core/testing';

import { AngebotService } from './angebot.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Angebot} from '../../models/Angebot';

describe('AngebotService', () => {
  let service: AngebotService;
  const angebot1: Angebot = new Angebot();
  angebot1.ankunftDatum = '17.12.2020';
  angebot1.ankunftZeit = '17:12 Uhr';
  angebot1.abfahrtStrasse = 'Gießenerstraße 299';
  angebot1.abfahrtPlz = '35390';
  angebot1.abfahrtOrt = 'Gießen';
  angebot1.ankunftStrasse = 'Berlinerstraße 399';
  angebot1.ankunftPlz = '10201';
  angebot1.ankunftOrt = 'Berlin';
  angebot1.bezahlung = '30€ VB';
  const angebot2: Angebot = new Angebot();
  angebot2.ankunftDatum = '18.12.2020';
  angebot2.ankunftZeit = '18:12 Uhr';
  angebot2.abfahrtStrasse = 'Heidelbergerstraße 299';
  angebot2.abfahrtPlz = '69120';
  angebot2.abfahrtOrt = 'Heidelberg';
  angebot2.ankunftStrasse = 'Konstanzerstraße 399';
  angebot2.ankunftPlz = '80923';
  angebot2.ankunftOrt = 'Konstanz';
  angebot2.bezahlung = '30€ Pro 1m^3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(AngebotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Firebase', () => {
    let testData;
    let angeboteBefore: Angebot[];
    let angeboteAfter: Angebot[];
    it('CRUD Angebot on Firebase', async (done) => {
      const subAngebote = await service.observableAngebote().subscribe(async data => {
        angeboteBefore = data;
        expect(angeboteBefore).toBeDefined();
      });
      subAngebote.unsubscribe();
      await service.addAngebot(angebot1)
          .then(res => {
            testData = res.angebote;
            expect(res.message).toBeDefined();
          }).catch(err => {
            console.log(err);
          });
      await service.observableAngebote().subscribe(async data => {
        angeboteAfter = data;
        expect(angeboteAfter.length).toBe(angeboteBefore.length + 1);
      });
      done();
    });
  });
});
