import { TestBed } from '@angular/core/testing';

import { FahrtService } from './fahrt.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('FahrtService', () => {
  let service: FahrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(FahrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
