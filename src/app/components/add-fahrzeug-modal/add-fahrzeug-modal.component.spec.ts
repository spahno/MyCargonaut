import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFahrzeugModalComponent } from './add-fahrzeug-modal.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AddFahrzeugModalComponent', () => {
  let component: AddFahrzeugModalComponent;
  let fixture: ComponentFixture<AddFahrzeugModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFahrzeugModalComponent ],
      imports: [IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFahrzeugModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
