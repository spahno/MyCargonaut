import { Component, OnInit } from '@angular/core';
import {Angebot} from '../../models/Angebot';

@Component({
  selector: 'app-angebot',
  templateUrl: './angebot.page.html',
  styleUrls: ['./angebot.page.scss'],
})
export class AngebotPage implements OnInit {
  angebote: Angebot[] = [];
  constructor() {
    this.angebote = [];
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
    setTimeout(() => {
      this.angebote.push(angebot1);
      this.angebote.push(angebot2);
    }, 1000);
  }

  ngOnInit() {
  }

}
