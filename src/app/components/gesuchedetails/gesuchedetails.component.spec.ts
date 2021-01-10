import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GesuchedetailsComponent } from './gesuchedetails.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('GesuchedetailsComponent', () => {
  let component: GesuchedetailsComponent;
  let fixture: ComponentFixture<GesuchedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesuchedetailsComponent ],
      imports: [AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule, IonicModule.forRoot(),
        FormsModule, CommonModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GesuchedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
