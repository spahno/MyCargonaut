import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AngebotCardComponent } from './angebot-card.component';
import {Angebot} from '../../../models/Angebot';
import {Gesuch} from '../../../models/Gesuch';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AnfrageCardComponent', () => {
  let component: AngebotCardComponent;
  let fixture: ComponentFixture<AngebotCardComponent>;

  /***
   * Test Daten
   */
  const angebot: Angebot = new Angebot();
  angebot.ankunftDatum = '17.12.2020';
  angebot.ankunftZeit = '17:12 Uhr';
  angebot.abfahrtStrasse = 'Gießenerstraße 299';
  angebot.abfahrtPlz = '35390';
  angebot.abfahrtOrt = 'Gießen';
  angebot.ankunftStrasse = 'Berlinerstraße 399';
  angebot.ankunftPlz = '10201';
  angebot.ankunftOrt = 'Berlin';
  angebot.bezahlung = '30€ VB';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngebotCardComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule],
      providers: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AngebotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.inputAngebot = angebot;
    expect(component).toBeTruthy();
  });
  it('should delete', () => {

    expect(component).toBeTruthy();
  });
});
