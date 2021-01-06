import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuchenPage } from './suchen.page';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('SuchenPage', () => {
  let component: SuchenPage;
  let fixture: ComponentFixture<SuchenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuchenPage ],
      imports: [AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule, IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuchenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
