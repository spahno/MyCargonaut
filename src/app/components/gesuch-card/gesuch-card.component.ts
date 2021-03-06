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
    /**
     * prepares user data
     */
    Object.assign(this.user, this.inputUser);
    Object.assign(this.gesuch, this.inputGesuch);
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

  /**
   * Sets the interest of a user for a Gesuch
   * @param interessenten all the interessenten of a Gesuch
   */
  setInteressenten(interessenten: InteressentG[]) {
    this.interessenten = [];
    interessenten.forEach(interessent => {
      this.authService.findUserById(interessent.userId).then(user => {
        this.interessenten.push({user, interessent});
      });
    });
  }

  /**
   * Sets the driver for a Gesuch
   * @param fahrerArray all the drivers
   */
  setFahrer(fahrerArray: InteressentG[]) {
    this.interessenten = [];
    fahrerArray.forEach(fahrer => {
      this.authService.findUserById(fahrer.userId).then(user => {
        this.fahrer.push({ user, fahrer});
      });
    });
  }

  /**
   * Sets the number of interessenten in the badge to display to a user
   * @param interessenten is the number of interested users
   */
  setInteressentenText(interessenten: number) {
    if (interessenten === 0) {
      this.interessentenText = 'Keine Interessenten';
    } else if (interessenten === 1) {
      this.interessentenText = '1 Interessent';
    } else {
      this.interessentenText = interessenten + ' Interessenten';
    }
  }

  /**
   * Accepts the request of a user for a Gesuch
   * @param interessent is the requesting user
   */
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

  /**
   * Deletes the request of a user
   * @param interessent is the requesting user
   */
  interessentEntfernen(interessent: InteressentG) {
    this.authService.findUserById(interessent.userId).then(res => {
      const delInt: User = res;
      delInt.id = interessent.userId;
      const findIndex: number = delInt.interessierteGesuche.indexOf(this.gesuch._ID);
      delInt.interessierteGesuche.splice(findIndex, 1);
      this.authService.updateUser(delInt)
          .catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Interessenten des Gesuchs. Error: ' + err, 'Ok'));
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim finden des Interessenten des Gesuchs. Error: ' + err, 'Ok'));
    this.gesuch.deleteInteressent(interessent);
    this.gesuchService.updateGesuch(this.gesuch).then(res => {
      Object.assign(this.gesuch, res.gesuch);
    }).catch(err => this.presentAlert('Fehler', 'Fehler beim Update des Gesuchs. Error: ' + err, 'Ok'));
  }

  /**
   * Opens a popover to display more information about the user and his request
   * @param interessent the requesting user
   */
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

  /**
   * starts the drive and presents an alert to display confirmation to user
   */
  starteFahrt() {
    if (this.authService.getUser() && this.authService.getUser().id === this.gesuch.erstellerId){
      if (this.gesuch) {
        if (!this.gesuch.fahrtId) {
          this.fahrtService.startFahrt().then(res => {
            this.fahrt = res.fahrt;
            this.gesuch.fahrtId = res.fahrt._ID;
            this.gesuchService.updateGesuch(this.gesuch).then(res2 => {
              this.presentAlert('Fahrt gestartet', 'Die Fahrt von ' + res2.gesuch.abfahrtOrt +
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
        this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Error: gesuch: undefined', 'Ok');
      }
    } else {
      this.presentAlert('Fehler', 'Fahrt starten fehlgeschlagen. Error: Nicht Authorisiert', 'Ok');
    }
  }

  /**
   * ends the drive and presents a popover to rate the drive
   */
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
        this.presentAlert('Fehler', 'Fahrt beenden fehlgeschlagen. Error: gesuch: undefined', 'Ok');
      }
    } else {
      this.presentAlert('Fehler', 'Fahrt beenden fehlgeschlagen. Error: Nicht Authorisiert', 'Ok');
    }
  }

  /**
   * Presents the rating popover
   * @param fahrtId is the id of the ride to be rated
   */
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

  /**
   * Gets all the Fahrzeuge of a user that is accepting a Gesuch to set the Fahrzeug
   * the cargo is to be transported with
   */
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

  /**
   * Presents a popover to the user to choose one of his Fahrzeuge for a drive
   */
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
                    this.presentAlert('Fehler!', 'Fehler beim speichern des Gesuchs entstanden. Error: ' + err, 'Ok');
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


  /**
   * This Methods Presents a Alert to Call the deleteGesuch() Method
   */
  async deleteGesuchAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gesuch löschen!',
      message: 'Möchten Sie das Gesuch von ' + this.gesuch.abfahrtOrt +
          ' nach ' + this.gesuch.ankunftOrt + ' wirklich löschen?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Löschen',
          handler: () => {
            this.deleteGesuch();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * This Methods Deletes a Gesuch from a Interessent a Ersteller and the Gesuch it self
   */
  deleteGesuch() {
    const interessentenArr: InteressentG[] = this.gesuch.getInteressenten().concat(this.gesuch.getFahrer());
    if (interessentenArr.length === 0) {
      this.deleteGesuchCurrentUser();
    } else {
      interessentenArr.forEach(interessent => {
        this.authService.findUserById(interessent.userId).then(user => {
          user.interessierteGesuche = user.interessierteGesuche.filter(intr => intr !== this.gesuch._ID);
          this.authService.updateUser(user).then(() => {
            this.deleteGesuchCurrentUser();
          }).catch(err => {
            this.presentAlert('Fehler!', 'Fehler beim Updaten des Interessenten. Error: ' + err, 'Ok');
          });
        }).catch(err => {
          this.presentAlert('Fehler!', 'Fehler beim Löschen des Gesuchs im Interessenten. Error: ' + err, 'Ok');
        });
      });
    }
  }

  /**
   * This Method deletes the Gesuch from the Current user and calls a method to to update in firebase
   */
  deleteGesuchCurrentUser() {
    this.user.erstellteGesuche = this.user.erstellteGesuche.filter(ges => ges !== this.gesuch._ID);
    this.authService.updateUser(this.user).then(newUser => {
      Object.assign(this.user, newUser);
      this.gesuchService.deleteGesuch(this.gesuch._ID).catch(err => {
        this.presentAlert('Fehler!', 'Fehler beim Löschen des Gesuch entstanden. Error: ' + err, 'Ok');
      });
    }).catch(err => {
      this.presentAlert('Fehler!', 'Fehler beim Updaten des Users. Error: ' + err, 'Ok');
    });
  }

  /**
   * This method is a async Funktion and is presenting an alert
   * @param header is the Heaermessage of an alert
   * @param message is the message of an alert
   * @param buttonText is the Confirm Buttontext of an alert
   */
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
