import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
    let service: AuthService;
    const testUser: User = new User(
        'test@test.de',
        'testUser',
        'Testman',
        'McTest');

    /*beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.testFirebaseConfig),
                AngularFirestoreModule,
                RouterTestingModule
            ]
        });
        service = TestBed.inject(AuthService);
    });

    afterAll(async () => {
        service.deleteProfile()
            .then(() => {
                console.log('TestBed successfully reset');
            }).catch(err => {
            console.log('Failed to reset TestBed. Error: ' + err);
        });
    });

    describe('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Authentication', () => {
        it('should register a new User', async (done) => {
            await service.signUp(
                testUser.email,
                testUser.username,
                testUser.vorname,
                testUser.nachname,
                '123456')
                .then(async (user) => {
                    expect(user).toBeDefined();
                })
                .catch(err => {
                    console.log(err);
                });
            done();
        });

        it('should check type', () => {
            expect(service.user).toBeInstanceOf(User);
        });
    });*/
});
