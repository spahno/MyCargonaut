import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLieferobjektModalComponent } from './add-lieferobjekt-modal.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AddLieferobjektModalComponent', () => {
  let component: AddLieferobjektModalComponent;
  let fixture: ComponentFixture<AddLieferobjektModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLieferobjektModalComponent ],
      imports: [IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLieferobjektModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
