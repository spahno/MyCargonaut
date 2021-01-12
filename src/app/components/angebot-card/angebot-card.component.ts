import {Component, Input, OnInit} from '@angular/core';
import {Angebot, InteressentA} from '../../../models/Angebot';
import {AuthService} from '../../../services/auth/auth.service';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {FahrtService} from '../../../services/fahrt/fahrt.service';
import {AlertController, ModalController} from '@ionic/angular';
import {User} from '../../../models/user';
import {LieferobjektService} from '../../../services/lieferobjekt/lieferobjekt.service';
import {Fahrt} from '../../../models/Fahrt';
import {Fahrzeug} from '../../../models/fahrzeug';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {InteressentG} from '../../../models/Gesuch';
import {ProfilPopoverComponent} from '../profil-popover/profil-popover.component';

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
  fahrzeug: Fahrzeug = new Fahrzeug();
  interessenten: {user: User, interessent: InteressentA}[] = [];
  kunden: {user: User, kunde: InteressentA}[] = [];
  fahrt: Fahrt = new Fahrt();
  interessentenText: string;
  ersteller = new User( '', '', '', '');
  public dropdown = false;

  constructor(public authService: AuthService,
              private angebotService: AngebotService,
              private fahrtService: FahrtService,
              private lieferobjektService: LieferobjektService,
              public alertController: AlertController,
              private fahrzeugService: FahrzeugService,
              public modalController: ModalController) {
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
    if (this.angebot.fahrzeugId) {
      this.fahrzeugService.findFahrzeugById(this.angebot.fahrzeugId).subscribe(fahrzeug => {
        Object.assign(this.fahrzeug, fahrzeug);
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
    if (!this.angebot.isKunde(interessent.userId)) {
      this.angebot.addKunde(interessent);
      this.angebot.deleteInteressent(interessent);
      this.angebotService.updateAngebot(this.angebot).then(res => {
        Object.assign(this.angebot, res.angebot);
      }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Angebots. Error: ' + err, 'Ok'));
    } else {
      alert('Der Interessent wurde schon angenommen.');
    }
  }

  interessentEntfernen(interessent: InteressentA) {
    this.angebot.deleteInteressent(interessent);
    this.angebotService.updateAngebot(this.angebot).then(res => {
      Object.assign(this.angebot, res.angebot);
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Angebots. Error: ' + err, 'Ok'));
  }

  async infoPopoverInteressent(interessent: InteressentA) {
    const intUser = await this.authService.findUserById(interessent.userId);
    const sub = await this.lieferobjektService.findLieferobjektById(interessent.objectId).subscribe(async intLieferobjekt => {
      sub.unsubscribe();
      const modal = await this.modalController.create({
        component: ProfilPopoverComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          interessent: intUser,
          lieferobjekt: intLieferobjekt
        }
      });
      return await modal.present();
    });
  }

  starteFahrt() {
    if (this.authService.getUser() && this.authService.getUser().id === this.angebot.erstellerId){
      if (this.angebot) {
        if (!this.angebot.fahrtId) {
          this.fahrtService.startFahrt().then(res => {
            this.fahrt = res.fahrt;
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
            this.fahrt = res;
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
            this.fahrtService.fahrtBewerten(fahrtId, bewertung).then(fahrt => {
              this.fahrt = fahrt;
            }).catch(reason => {
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
              const interesentUser = this.authService.getUser();
              sendInteressent.userId = interesentUser.id;
              interesentUser.interessierteAngebote.push(this.angebot._ID);
              const object = await this.lieferobjektService.addLieferobjekt(data);
              sendInteressent.objectId = object.lieferobjekt._ID;
              this.angebot.addInteressent(sendInteressent);
              this.authService.updateUser(interesentUser).catch(err => {
                this.presentAlert('Fehler!', 'Fehler beim update des Users der sich interessiert. Error: ' + err, 'Ok');
              });
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

  /**
   * This Methods Presents a Alert to Call the deleteAngebot() Method
   */
  async deleteAngebotAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Abgebot löschen!',
      message: 'Möchten Sie das Angebot von ' + this.angebot.abfahrtOrt +
          ' nach ' + this.angebot.ankunftOrt + ' wirklich löschen?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Löschen',
          handler: () => {
            this.deleteAngebot();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * This Methods Deletes a Angebot from a Interessent a Ersteller and the Angebot it self
   */
  deleteAngebot() {
    this.angebotService.deleteAngebot(this.angebot._ID).then(id => {
      this.angebot.getInteressenten().forEach(interessent => {
        this.user.erstellteAngebote = this.user.erstellteAngebote.filter(ange => ange !== id);
        this.authService.updateUser(this.user);
        this.authService.findUserById(interessent.userId).then(user => {
          user.interessierteAngebote = user.interessierteAngebote.filter(intr => intr !== id);
          this.authService.updateUser(user);
        });
      });
    }).catch(err => {
      this.presentAlert('Fehler!', 'Fehler beim Löschen des Angebots entstanden. Error: ' + err, 'Ok');
    });
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
