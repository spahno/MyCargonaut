import { TestBed } from '@angular/core/testing';

import { FahrzeugService } from './fahrzeug.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('FahrzeugService', () => {
  let service: FahrzeugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(FahrzeugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
