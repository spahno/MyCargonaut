import {Component, Input, OnInit} from '@angular/core';
import {Anfrage} from '../../../models/Anfrage';
import {Gesuch, InteressentG} from '../../../models/Gesuch';
import {Angebot, InteressentA} from '../../../models/Angebot';
import {AuthService} from '../../../services/auth/auth.service';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {FahrtService} from '../../../services/fahrt/fahrt.service';
import {AlertController, ModalController} from '@ionic/angular';
import {AddLieferobjektModalComponent} from '../add-lieferobjekt-modal/add-lieferobjekt-modal.component';
import {User} from '../../../models/user';
import {GesuchService} from '../../../services/gesuch/gesuch.service';

@Component({
  selector: 'app-gesuch-card',
  templateUrl: './gesuch-card.component.html',
  styleUrls: ['./gesuch-card.component.scss'],
})
export class GesuchCardComponent implements OnInit {
  @Input() inputGesuch = new Gesuch();
  gesuch = new Gesuch();
  user: User = new User('', '', '', '');
  interessenten: string;
  erstellerName: string;
  erstellerBild = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  public dropdown = false;

  constructor(public authService: AuthService,
              private gesuchService: GesuchService,
              private fahrtService: FahrtService,
              public alertController: AlertController) {
    this.authService.loadPageSubscription(u => {
      Object.assign(this.user, u);
    });
  }

  ngOnInit() {
    Object.assign(this.gesuch, this.inputGesuch);
    this.setInteressenten(this.gesuch.getInteressenten().length);
    if (this.gesuch.erstellerId) {
      const sub = this.authService.findById(this.gesuch.erstellerId).subscribe(res => {
        sub.unsubscribe();
        this.erstellerName = res.vorname + ' ' + res.nachname;
        this.erstellerBild = res.profileImage || 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
      });
    } else {
      this.erstellerName = 'Kein Ersteller gespeichert!';
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
    if (this.authService.getUser() && this.authService.getUser().id === this.gesuch.erstellerId){
      if (this.gesuch) {
        if (!this.gesuch.fahrtId) {
          this.fahrtService.startFahrt().then(res => {
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
    if (this.gesuch) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Prompt!',
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
            handler: (data) => {
              const interessent = new InteressentA();
              interessent.userId = this.authService.getUser().id;
              interessent.objectId = data;
              this.gesuch.addInteressent(new InteressentG());
              this.gesuchService.updateGesuch(this.gesuch).catch(err => {
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
