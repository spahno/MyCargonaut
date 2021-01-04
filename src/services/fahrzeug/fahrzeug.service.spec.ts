import {TestBed} from '@angular/core/testing';

import {FahrzeugService} from './fahrzeug.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Fahrzeug} from '../../models/fahrzeug';

describe('FahrzeugService', () => {
    let service: FahrzeugService;
    const addedFahrzeuge: string[] = [];
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule,
            ]
        });
        service = TestBed.inject(FahrzeugService);
    });

    afterAll(async () => {
        addedFahrzeuge.forEach(fahrzeugId => {
            service.deleteFahrzeug(fahrzeugId).then(() => {
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
        const testFahrzeug = new Fahrzeug();
        testFahrzeug.marke = 'Test Marke';
        testFahrzeug.modell = 'Test Modell';
        testFahrzeug.fahrzeugart = 'Test Fahrzeugart';
        it('Should add and get Fahrzeuge from Firebase', async (done) => {
            service.addFahrzeug(testFahrzeug).then(res => {
                const resFahrzeug: Fahrzeug = res.fahrzeug;
                addedFahrzeuge.push(resFahrzeug.id);
                expect(resFahrzeug.marke).toEqual(testFahrzeug.marke);
                expect(resFahrzeug.modell).toEqual(testFahrzeug.modell);
                expect(resFahrzeug.fahrzeugart).toEqual(testFahrzeug.fahrzeugart);
                expect(res.message).toBeDefined();
                const sub = service.findFahrzeugById(resFahrzeug.id).subscribe(data => {
                    sub.unsubscribe();
                    expect(data.id).toEqual(resFahrzeug.id);
                    expect(data.marke).toEqual(resFahrzeug.marke);
                    expect(data.modell).toEqual(resFahrzeug.modell);
                    expect(data.fahrzeugart).toEqual(resFahrzeug.fahrzeugart);
                    done();
                });
            }).catch(err => {
                console.error('Test get Lieferobjekt Document failed. Error: ' + err);
            });
        });
    });
});
