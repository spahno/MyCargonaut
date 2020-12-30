import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RegisterPage} from './register.page';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('RegisterPage', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
                AngularFireAuthModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

   /* it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
