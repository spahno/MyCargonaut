import {Component, Input, OnInit} from '@angular/core';
import {Angebot, InteressentA} from '../../../models/Angebot';
import {AuthService} from '../../../services/auth/auth.service';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {FahrtService} from '../../../services/fahrt/fahrt.service';
import {AlertController} from '@ionic/angular';
import {User} from '../../../models/user';
import {LieferobjektService} from '../../../services/lieferobjekt/lieferobjekt.service';

@Component({
  selector: 'app-angebot-card',
  templateUrl: './angebot-card.component.html',
  styleUrls: ['./angebot-card.component.scss'],
})
export class AngebotCardComponent implements OnInit {
  @Input() inputAngebot = new Angebot();
  angebot = new Angebot();
  @Input() inputUser: User = new User('', '', '', '');
  user: User = new User('', '', '', '');
  interessenten: {user: User, interessent: InteressentA}[] = [];
  kunden: {user: User, kunde: InteressentA}[] = [];
  interessentenText: string;
  ersteller = new User( '', '', '', '');
  public dropdown = false;

  constructor(public authService: AuthService,
              private angebotService: AngebotService,
              private fahrtService: FahrtService,
              private lieferobjektService: LieferobjektService,
              public alertController: AlertController) {
    this.authService.loadPageSubscription(u => {
      Object.assign(this.user, u);
      });
  }

  ngOnInit() {
    Object.assign(this.user, this.inputUser);
    Object.assign(this.angebot, this.inputAngebot);
    const tmpInteressenten = this.angebot.getInteressenten();
    this.setInteressenten(tmpInteressenten);
    this.setInteressentenText(tmpInteressenten.length);
    this.setKunden(this.angebot.getKunden());
    if (this.angebot.erstellerId) {
      this.authService.findUserById(this.angebot.erstellerId).then(ersteller => {
        Object.assign(this.ersteller, ersteller);
      });
    }
  }

  setInteressenten(interessenten: InteressentA[]) {
    this.interessenten = [];
    interessenten.forEach(interessent => {
      this.authService.findUserById(interessent.userId).then(user => {
        this.interessenten.push({user, interessent});
      });
    });
  }

  setKunden(kunden: InteressentA[]) {
    this.kunden = [];
    kunden.forEach(kunde => {
      this.authService.findUserById(kunde.userId).then(user => {
        this.kunden.push({user, kunde});
      });
    });
  }

  setInteressentenText(interessenten: number) {
    if (interessenten === 0) {
      this.interessentenText = 'Keine Interessenten';
    } else if (interessenten === 1) {
      this.interessentenText = '1 Interessent';
    } else {
      this.interessentenText = interessenten + ' Interessenten';
    }
  }

  interessentAnnehmen(interessent: InteressentA) {
    this.angebot.addKunde(interessent);
    this.angebot.deleteInteressent(interessent);
    this.angebotService.updateAngebot(this.angebot).then(res => {
      Object.assign(this.angebot, res.angebot);
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Angebots. Error: ' + err, 'Ok'));
  }

  interessentEntfernen(interessent: InteressentA) {
    this.angebot.deleteInteressent(interessent);
    this.angebotService.updateAngebot(this.angebot).then(res => {
      Object.assign(this.angebot, res.angebot);
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Angebots. Error: ' + err, 'Ok'));
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
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Angebot anfragen',
        subHeader: 'Welches Objekt soll für Sie transportiert werden? ',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'name des Lieferobjekts'
          },
          {
            name: 'beschreibung',
            type: 'text',
            placeholder: 'beschreibung'
          },
          {
            name: 'preis',
            type: 'text',
            placeholder: 'Preisvorschlag'
          }],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
          }, {
            text: 'Anfrage senden',
            handler: async (data) => {
              const sendInteressent = new InteressentA();
              sendInteressent.userId = this.authService.getUser().id;
              const object = await this.lieferobjektService.addLieferobjekt(data);
              sendInteressent.objectId = object.lieferobjekt._ID;
              this.angebot.addInteressent(sendInteressent);
              this.angebotService.updateAngebot(this.angebot).catch(err => {
                this.presentAlert('Fehler!', 'Fehler beim speichern des Angebots entstanden. Error: ' + err, 'Ok');
              });
            }
          }
        ]
      });
      await alert.present();
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