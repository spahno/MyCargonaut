import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonicModule, NavController} from '@ionic/angular';

import { AngebotPage } from './angebot.page';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('AngebotPage', () => {
  let component: AngebotPage;
  let fixture: ComponentFixture<AngebotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngebotPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AngebotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
