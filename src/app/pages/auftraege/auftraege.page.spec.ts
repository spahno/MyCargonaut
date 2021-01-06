import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AuftraegePage} from './auftraege.page';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AuftraegePage', () => {
    let component: AuftraegePage;
    let fixture: ComponentFixture<AuftraegePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuftraegePage],
            imports: [IonicModule.forRoot(),
                AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule,
                RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AuftraegePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    /*it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
