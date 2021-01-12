import {Component, Input, OnInit} from '@angular/core';
import {Gesuch, InteressentG} from '../../../models/Gesuch';
import {AuthService} from '../../../services/auth/auth.service';
import {FahrtService} from '../../../services/fahrt/fahrt.service';
import {AlertController, ModalController} from '@ionic/angular';
import {User} from '../../../models/user';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {Fahrt} from '../../../models/Fahrt';
import {Lieferobjekt} from '../../../models/Lieferobjekt';
import {LieferobjektService} from '../../../services/lieferobjekt/lieferobjekt.service';
import {ProfilPopoverComponent} from '../profil-popover/profil-popover.component';

@Component({
  selector: 'app-gesuch-card',
  templateUrl: './gesuch-card.component.html',
  styleUrls: ['../angebot-card/angebot-card.component.scss'],
})
export class GesuchCardComponent implements OnInit {
  @Input() inputGesuch = new Gesuch();
  gesuch = new Gesuch();
  @Input() inputUser: User = new User('', '', '', '');
  user: User = new User('', '', '', '');
  lieferobjekt: Lieferobjekt = new Lieferobjekt();
  interessenten: {user: User, interessent: InteressentG}[] = [];
  fahrer: {user: User, fahrer: InteressentG}[] = [];
  fahrt: Fahrt = new Fahrt();
  interessentenText: string;
  ersteller = new User( '', '', '', '');
  public dropdown = false;

  constructor(public authService: AuthService,
              private gesuchService: GesuchService,
              private fahrtService: FahrtService,
              private lieferobjektService: LieferobjektService,
              private fahrzeugService: FahrzeugService,
              public alertController: AlertController,
              public modalController: ModalController) {

  }

  ngOnInit() {
    Object.assign(this.user, this.inputUser);
    Object.assign(this.gesuch, this.inputGesuch);
    console.log('Card:' + this.user.id);
    console.log('Card:' + this.gesuch._ID);
    const tmpInteressenten = this.gesuch.getInteressenten();
    this.setInteressenten(tmpInteressenten);
    this.setInteressentenText(tmpInteressenten.length);
    this.setFahrer(this.gesuch.getFahrer());
    if (this.gesuch.erstellerId) {
      this.authService.findUserById(this.gesuch.erstellerId).then(ersteller => {
        Object.assign(this.ersteller, ersteller);
      });
    }
    if (this.gesuch.lieferobjektId) {
      this.lieferobjektService.findLieferobjektById(this.gesuch.lieferobjektId).subscribe(lieferobjekt => {
        Object.assign(this.lieferobjekt, lieferobjekt);
      });
    }
  }

  setInteressenten(interessenten: InteressentG[]) {
    this.interessenten = [];
    interessenten.forEach(interessent => {
      this.authService.findUserById(interessent.userId).then(user => {
        this.interessenten.push({user, interessent});
      });
    });
  }

  setFahrer(fahrerArray: InteressentG[]) {
    this.interessenten = [];
    fahrerArray.forEach(fahrer => {
      this.authService.findUserById(fahrer.userId).then(user => {
        this.fahrer.push({ user, fahrer});
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

  interessentAnnehmen(interessent: InteressentG) {
    if (!this.gesuch.isFahrer(interessent.userId)) {
      this.gesuch.addFahrer(interessent);
      this.gesuch.deleteInteressent(interessent);
      this.gesuchService.updateGesuch(this.gesuch).then(res => {
        Object.assign(this.gesuch, res.gesuch);
      }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Gesuchs. Error: ' + err, 'Ok'));
    } else {
      alert('Der Interessent wurde schon angenommen.');
    }
  }

  interessentEntfernen(interessent: InteressentG) {
    this.gesuch.deleteInteressent(interessent);
    this.gesuchService.updateGesuch(this.gesuch).then(res => {
      Object.assign(this.gesuch, res.gesuch);
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Gesuchs. Error: ' + err, 'Ok'));
  }

  async infoPopoverInteressent(interessent: InteressentG) {
    const intUser = await this.authService.findUserById(interessent.userId);
    const sub = await this.fahrzeugService.findFahrzeugById(interessent.fahrzeugId).subscribe(async intFahrzeug => {
      sub.unsubscribe();
      const modal = await this.modalController.create({
        component: ProfilPopoverComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          interessent: intUser,
          fahrzeug: intFahrzeug
        }
      });
      return await modal.present();
    });
  }

  starteFahrt() {
    if (this.authService.getUser() && this.authService.getUser().id === this.gesuch.erstellerId){
      if (this.gesuch) {
        if (!this.gesuch.fahrtId) {
          this.fahrtService.startFahrt().then(res => {
            this.fahrt = res.fahrt;
            this.gesuch.fahrtId = res.fahrt._ID;
            this.gesuchService.updateGesuch(this.gesuch).then(res2 => {
              this.presentAlert('Fahrt gestartet', 'Die fahrt von ' + res2.gesuch.abfahrtOrt +
                  ' nach ' + res2.gesuch.ankunftOrt + ' wurde gestartet.<br>' +
                  'Ihre angegebene Ankunftszeit ist: ' + res2.gesuch.ankunftZeit + '.', 'Los gehts!');
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
    if (this.authService.getUser() && this.authService.getUser().id === this.gesuch.erstellerId) {
      if (this.gesuch) {
        if (this.gesuch.fahrtId){
          this.fahrtService.endFahrt(this.gesuch.fahrtId).then( async res => {
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

  getFahrzeuge(): Promise<{ name: string, type: 'radio', label: string, value: string, checked: boolean}[]> {
    return new Promise( (resolve, reject) => {
      if (this.user.fahrzeuge && this.user.fahrzeuge.length === 0) {
        reject('Keine Fahrzeuge gespeichert');
      } else {
        const radioInputs: { name: string, type: 'radio', label: string, value: string, checked: boolean }[] = [];
        let first = true;
        this.user.fahrzeuge.forEach(fahrzeugId => {
          const sub = this.fahrzeugService.findFahrzeugById(fahrzeugId).subscribe(fahrzeug => {
            sub.unsubscribe();
            radioInputs.push({
              name: fahrzeugId, type: 'radio', label: fahrzeug.marke + ' ' +
                  fahrzeug.modell, value: fahrzeugId, checked: first
            });
            first = false;
            if (radioInputs.length === this.user.fahrzeuge.length) {
              resolve(radioInputs);
            }
          });
        });
      }
    });
  }

  async gesuchAnfragen() {
    if (this.gesuch) {
      await this.getFahrzeuge().then(async radioInputs => {
        if (radioInputs) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Fahrt anbieten',
            message: 'Wähle dein Fahrzeug mit dem du die Fahrt anbieten möchtest:',
            inputs: radioInputs,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                }
              }, {
                text: 'Anfrage senden',
                handler: (data) => {
                  const sendInteressent = new InteressentG();
                  const interesentUser = this.authService.getUser();
                  interesentUser.interessierteGesuche.push(this.gesuch._ID);
                  sendInteressent.userId = interesentUser.id;
                  sendInteressent.fahrzeugId = data;
                  this.gesuch.addInteressent(sendInteressent);
                  this.authService.updateUser(interesentUser).catch(err => {
                    this.presentAlert('Fehler!', 'Fehler beim update des Users der sich interessiert. Error: ' + err, 'Ok');
                  });
                  this.gesuchService.updateGesuch(this.gesuch).catch(err => {
                    this.presentAlert('Fehler!', 'Fehler beim speichern des Angebots entstanden. Error: ' + err, 'Ok');
                  });
                }
              }
            ]
          });
          await alert.present();
        }
      }).catch(err => {
        this.presentAlert('Fehler!', 'Fehler laden der Fahrzeuge. Error: ' + err, 'Ok');
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
