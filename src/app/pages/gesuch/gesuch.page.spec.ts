import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GesuchPage } from './gesuch.page';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('GesuchPage', () => {
  let component: GesuchPage;
  let fixture: ComponentFixture<GesuchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesuchPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GesuchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
