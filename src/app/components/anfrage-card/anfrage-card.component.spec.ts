import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnfrageCardComponent } from './anfrage-card.component';
import {Angebot} from '../../models/Angebot';

describe('AnfrageCardComponent', () => {
  let component: AnfrageCardComponent;
  let fixture: ComponentFixture<AnfrageCardComponent>;

  /***
   * Test Daten
   */
  const angebot1: Angebot = new Angebot();
  angebot1.ankunftDatum = '17.12.2020';
  angebot1.ankunftZeit = '17:12 Uhr';
  angebot1.abfahrtStrasse = 'Gießenerstraße 299';
  angebot1.abfahrtPlz = '35390';
  angebot1.abfahrtOrt = 'Gießen';
  angebot1.ankunftStrasse = 'Berlinerstraße 399';
  angebot1.ankunftPlz = '10201';
  angebot1.ankunftOrt = 'Berlin';
  angebot1.bezahlung = '30€ VB';
  const angebot2: Angebot = new Angebot();
  angebot2.ankunftDatum = '18.12.2020';
  angebot2.ankunftZeit = '18:12 Uhr';
  angebot2.abfahrtStrasse = 'Heidelbergerstraße 299';
  angebot2.abfahrtPlz = '69120';
  angebot2.abfahrtOrt = 'Heidelberg';
  angebot2.ankunftStrasse = 'Konstanzerstraße 399';
  angebot2.ankunftPlz = '80923';
  angebot2.ankunftOrt = 'Konstanz';
  angebot2.bezahlung = '30€ Pro 1m^3';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnfrageCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnfrageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.anfrage = angebot1;
    expect(component).toBeTruthy();
  });
});
