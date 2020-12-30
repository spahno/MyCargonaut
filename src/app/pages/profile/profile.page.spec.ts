import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfilePage} from './profile.page';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('ProfilePage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilePage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
                AngularFireAuthModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    /* it('should create', () => {
         expect(component).toBeTruthy();
     });*/
});
