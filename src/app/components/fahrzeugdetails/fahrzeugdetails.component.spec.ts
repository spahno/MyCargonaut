import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FahrzeugdetailsComponent} from './fahrzeugdetails.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('FahrzeugdetailsComponent', () => {
    let component: FahrzeugdetailsComponent;
    let fixture: ComponentFixture<FahrzeugdetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FahrzeugdetailsComponent],
            imports: [AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule, IonicModule.forRoot(),
                FormsModule, CommonModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FahrzeugdetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        component.fahrzeug = {
            nummernschild: '',
            marke: '',
            modell: '',
            fahrzeugart: '',
            farbe: '',
            baujahr: 0,
            hoehe: 0,
            breite: 0,
            tiefe: 0
        };
        component.detailmode = false;
        component.editmode = false;
        expect(component).toBeTruthy();
    });
});
