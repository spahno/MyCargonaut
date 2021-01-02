import {TestBed} from '@angular/core/testing';

import {AngebotService} from './angebot.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Angebot} from '../../models/Angebot';

describe('AngebotService', () => {
    let service: AngebotService;
    const addedAngebote: string[] = [];
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

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule,
            ]
        });
        service = TestBed.inject(AngebotService);
    });

    afterAll(async () => {
        addedAngebote.forEach(angebot => {
            service.deleteAngebot(angebot).then(() => {
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
            const subAngebote = await service.observableAngebote().subscribe(data => {
                subAngebote.unsubscribe();
                expect(data).toBeDefined();
                done();
            });
        });

        it('Should add angebote to Firebase', async (done) => {
            let angeboteBefore: Angebot[];
            let angeboteAfter: Angebot[];
            let addedAngebot1: Angebot;
            let addedAngebot2: Angebot;
            const subAngebote = await service.observableAngebote().subscribe(async data => {
                angeboteBefore = data;
                expect(angeboteBefore).toBeDefined();
            });
            subAngebote.unsubscribe();
            await service.addAngebot(angebot1)
                .then(async res => {
                    addedAngebot1 = res.angebot;
                    expect(res.message).toBeDefined();
                    expect(res.angebot.bezahlung).toBe(angebot1.bezahlung);
                    addedAngebote.push(res.angebot._ID);
                }).catch(err => {
                    console.log(err);
                });
            await service.addAngebot(angebot2)
                .then(async res => {
                    addedAngebot2 = res.angebot;
                    expect(res.message).toBeDefined();
                    expect(res.angebot.bezahlung).toBe(angebot2.bezahlung);
                    addedAngebote.push(res.angebot._ID);
                }).catch(err => {
                    console.log(err);
                });
            const sub2 = await service.observableAngebote().subscribe(data => {
                sub2.unsubscribe();
                angeboteAfter = data;
                expect(angeboteAfter.length).toBe(angeboteBefore.length + 2);
                expect(service.addAngebot).toHaveBeenCalledTimes(2);
            });
            done();
        });


        it('Test update Angebot on Firebase', (done) => {
            let addedAngebot1 = new Angebot();
            service.addAngebot(angebot1)
                .then(res => {
                    addedAngebot1 = res.angebot;
                    expect(res.message).toBeDefined();
                    expect(res.angebot.bezahlung).toBe(angebot1.bezahlung);
                    addedAngebote.push(res.angebot._ID);
                    addedAngebot1.bezahlung = 'Test €';
                    service.updateAngebot(addedAngebot1).then(res2 => {
                        expect(res2.angebot._ID).toEqual(addedAngebot1._ID);
                        expect(res2.angebot.bezahlung).toEqual('Test €');
                        done();
                    });
                }).catch(err => {
                console.log(err);
            });
        });
    });
});
