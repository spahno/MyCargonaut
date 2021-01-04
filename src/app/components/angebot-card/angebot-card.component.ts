import {Component, Input, OnInit} from '@angular/core';
import {Anfrage} from '../../../models/Anfrage';
import {Gesuch, InteressentG} from '../../../models/Gesuch';
import {Angebot, InteressentA} from '../../../models/Angebot';
import {AuthService} from '../../../services/auth/auth.service';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {FahrtService} from '../../../services/fahrt/fahrt.service';
import {AlertController, ModalController} from '@ionic/angular';
import {AddLieferobjektModalComponent} from '../add-lieferobjekt-modal/add-lieferobjekt-modal.component';

@Component({
  selector: 'app-angebot-card',
  templateUrl: './angebot-card.component.html',
  styleUrls: ['./angebot-card.component.scss'],
})
export class AngebotCardComponent implements OnInit {
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

  constructor(public authService: AuthService,
              private angebotService: AngebotService,
              private fahrtService: FahrtService,
              public alertController: AlertController,
              public modalController: ModalController) {
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

  starteFahrt() {
    if (this.authService.getUser() && this.authService.getUser().id === this.angebot.erstellerId){
      if (this.angebot) {
        if (!this.angebot.fahrtId) {
          this.fahrtService.startFahrt().then(res => {
            this.angebot.fahrtId = res.fahrt._ID;
            this.angebotService.updateAngebot(this.angebot).then(res2 => {
              this.presentAlert('Fahrt gestartet', 'Die fahrt von ' + res2.angebot.abfahrtOrt +
                  ' nach ' + res2.angebot.ankunftOrt + ' wurde gestartet.<br>' +
                  'Ihre angegebene Ankunftszeit ist: ' + res2.angebot.ankunftZeit + '.', 'Los gehts!');
            }).catch(err => {
              this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Error: ' + err, 'Ok');
            });
          });
        } else {
          this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Die fahrt wurde bereits gestartet.', 'Ok');
        }
      } else {
        this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Error: angebot: undefined', 'Ok');
      }
    } else {
      this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Error: Nicht Authorisiert', 'Ok');
    }
  }

  fahrtBeenden() {
    if (this.authService.getUser() && this.authService.getUser().id === this.angebot.erstellerId) {
      if (this.angebot) {
        if (this.angebot.fahrtId){
          this.fahrtService.endFahrt(this.angebot.fahrtId).then( async res => {
            this.fahrtBewerten(res._ID);
          });
        } else {
          this.presentAlert('Fehler', 'Fahrt beenden fehlgeschlagen. Die fahrt wurde noch nicht gestartet.', 'Ok');
        }
      } else {
        this.presentAlert('Fehler', 'Fahrt beenden fehlgeschlagen. Error: angebot: undefined', 'Ok');
      }
    } else {
      this.presentAlert('Fehler', 'Fahrt beenden fehlgeschlagen. Error: Nicht Authorisiert', 'Ok');
    }
  }

  async fahrtBewerten(fahrtId: string) {
    const bewertung = 5;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Fahrt bewerten!',
      subHeader: 'Bewerte die Fahrt',
      message: '<ion-col>' +
          '                <ion-icon name="star"></ion-icon>' +
          '                <ion-icon name="star"></ion-icon>' +
          '                <ion-icon name="star"></ion-icon>' +
          '                <ion-icon name="star"></ion-icon>' +
          '                <ion-icon name="star"></ion-icon>' +
          '            </ion-col>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.fahrtService.fahrtBewerten(fahrtId, bewertung).catch(reason => {
              this.presentAlert('Bewertung fehlgeschlagen!', 'Beim speichern der Bewertung ist etwas schiefgelaufen. Error: <br>' +
              reason, 'Ok');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async angebotAnfragen() {
    if (this.angebot) {
      const modal = await this.modalController.create({
        component: AddLieferobjektModalComponent,
        cssClass: 'my-custom-class',
        mode: 'ios'
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      const interessent = new InteressentA();
      interessent.userId = this.authService.getUser().id;
      interessent.objectId = data;
      this.angebot.addInteressent(new InteressentA());
      this.angebotService.updateAngebot(this.angebot).catch(err => {
        this.presentAlert('Fehler!', 'Fehler beim speichern des Angebots entstanden. Error: ' + err, 'Ok');
      });
    }
  }

  async presentAlert(header: string, message: string, buttonText: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons: [buttonText]
    });
    await alert.present();
  }
}
