import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GesuchCardComponent } from './gesuch-card.component';
import {Angebot} from '../../../models/Angebot';
import {Gesuch} from '../../../models/Gesuch';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AnfrageCardComponent', () => {
  let component: GesuchCardComponent;
  let fixture: ComponentFixture<GesuchCardComponent>;

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
  const gesuch: Gesuch = new Gesuch();
  gesuch.ankunftDatum = '18.12.2020';
  gesuch.ankunftZeit = '18:12 Uhr';
  gesuch.abfahrtStrasse = 'Heidelbergerstraße 299';
  gesuch.abfahrtPlz = '69120';
  gesuch.abfahrtOrt = 'Heidelberg';
  gesuch.ankunftStrasse = 'Konstanzerstraße 399';
  gesuch.ankunftPlz = '80923';
  gesuch.ankunftOrt = 'Konstanz';
  gesuch.bezahlung = '30€ Pro 1m^3';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesuchCardComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule],
      providers: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GesuchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.inputAngebot = angebot;
    component.inputGesuch = gesuch;
    component.page = 'none';
    expect(component).toBeTruthy();
  });
});
