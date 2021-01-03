import {Component, Input, OnInit} from '@angular/core';
import {Anfrage} from '../../../models/Anfrage';
import {Gesuch, InteressentG} from '../../../models/Gesuch';
import {Angebot, InteressentA} from '../../../models/Angebot';

@Component({
  selector: 'app-anfrage-card',
  templateUrl: './anfrage-card.component.html',
  styleUrls: ['./anfrage-card.component.scss'],
})
export class AnfrageCardComponent implements OnInit {
  @Input() inputAngebot: Angebot = new Angebot();
  angebot = new Angebot();
  @Input() inputGesuch: Gesuch = new Gesuch();
  gesuch: Gesuch = new Gesuch();
  @Input() page = 'none';
  public dropdown = false;
  titel: string;
  interessenten = 'laden...';
  interessentenGesuch: InteressentG[];
  interessentenAngebot: InteressentA[];
  abfahrtOrt: string;
  abfahrtStrasse: string;
  abfahrtPlz: string;
  ankunftStrasse: string;
  ankunftOrt: string;
  ankunftPlz: string;
  ankunftDatum: string;
  ankunftZeit: string;
  bezahlung: string;
  erstellerName: string;
  erstellerProfilbild: string;

  constructor() {
  }

  ngOnInit() {
    if (this.page === 'angebot' && this.inputAngebot) {
      Object.assign(this.angebot, this.inputAngebot);
      const tmpInteressenten = this.angebot.getInteressenten() || [];
      this.setInteressenten(tmpInteressenten.length);
      this.titel = this.angebot.fahrzeugId;
      this.interessentenAngebot = this.angebot.getInteressenten();
      this.abfahrtOrt = this.angebot.abfahrtOrt;
      this.abfahrtStrasse = this.angebot.abfahrtStrasse;
      this.abfahrtPlz = this.angebot.abfahrtPlz;
      this.ankunftStrasse = this.angebot.ankunftStrasse;
      this.ankunftOrt = this.angebot.ankunftOrt;
      this.ankunftPlz = this.angebot.ankunftPlz;
      this.ankunftDatum = this.angebot.ankunftDatum;
      this.ankunftZeit = this.angebot.ankunftZeit;
      this.bezahlung = this.angebot.bezahlung;
      this.erstellerName = this.angebot.erstellerId;
      this.erstellerProfilbild = '';
    } else if (this.page === 'gesuch' && this.inputGesuch) {
      Object.assign(this.gesuch, this.inputGesuch);
      const tmpInteressenten = this.gesuch.getInteressenten() || [];
      this.setInteressenten(tmpInteressenten.length);
      this.titel = this.gesuch.lieferobjektId;
      this.interessentenGesuch = this.gesuch.getInteressenten();
      this.abfahrtOrt = this.gesuch.abfahrtOrt;
      this.abfahrtStrasse = this.gesuch.abfahrtStrasse;
      this.abfahrtPlz = this.gesuch.abfahrtPlz;
      this.ankunftStrasse = this.gesuch.ankunftStrasse;
      this.ankunftOrt = this.gesuch.ankunftOrt;
      this.ankunftPlz = this.gesuch.ankunftPlz;
      this.ankunftDatum = this.gesuch.ankunftDatum;
      this.ankunftZeit = this.gesuch.ankunftZeit;
      this.bezahlung = this.gesuch.bezahlung;
      this.erstellerName = this.gesuch.erstellerId;
      this.erstellerProfilbild = '';
    }
  }

  setInteressenten(interessenten: number) {
    if (interessenten === 0) {
      this.interessenten = 'Keine Interessenten';
    } else if (interessenten === 1) {
      this.interessenten = '1 Interessent';
    } else {
      this.interessenten = interessenten + ' Interessenten';
    }
  }

}
