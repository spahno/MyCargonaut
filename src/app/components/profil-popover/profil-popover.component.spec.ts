import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfilPopoverComponent} from './profil-popover.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ProfileService} from '../../../services/profile/profile.service';

describe('ProfilPopoverComponent', () => {
    let component: ProfilPopoverComponent;
    let fixture: ComponentFixture<ProfilPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilPopoverComponent],
            providers: [ProfileService, RouterTestingModule],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
});
