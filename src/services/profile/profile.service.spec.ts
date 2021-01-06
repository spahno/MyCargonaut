import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('ProfileService', () => {
    let service: ProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ModalController, AngularDelegate],
            imports: [
              AngularFireModule.initializeApp(environment.testFirebaseConfig),
              AngularFirestoreModule,
            ]
        });
        service = TestBed.inject(ProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should check mail adress', () => {
        const invalidMail = 'test@test';
        const validMail = 'test@test.de';

        expect(service.emailIsValid(invalidMail)).toBeFalse();
        expect(service.emailIsValid(validMail)).toBeTrue();
    });
});
