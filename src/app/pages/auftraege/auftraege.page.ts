import {Component} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {Gesuch} from '../../../models/Gesuch';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {AlertController, ModalController, ViewDidEnter, ViewDidLeave} from '@ionic/angular';
import {GesuchedetailsComponent} from '../../components/gesuchedetails/gesuchedetails.component';
import {AngebotedetailsComponent} from '../../components/angebotedetails/angebotedetails.component';
import {Subscription} from 'rxjs';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {ChangePageService} from '../../../services/changePage/change-page.service';

@Component({
    selector: 'app-auftraege',
    templateUrl: './auftraege.page.html',
    styleUrls: ['./auftraege.page.scss'],
})
export class AuftraegePage implements ViewDidEnter, ViewDidLeave {

    angebotSub: Subscription;
    gesuchSub: Subscription;
    user: User = new User('', '', '', '');
    gesucheArr: Gesuch[] = [];
    angeboteArr: Angebot[] = [];
    intGesucheArr: Gesuch[] = [];
    intAngeboteArr: Angebot[] = [];

    gesuch: Gesuch = new Gesuch();
    angebot: Angebot = new Angebot();

    detailmode: boolean = null;
    editmode: boolean = null;


    constructor(private authService: AuthService,
                private gesuchService: GesuchService,
                private angebotService: AngebotService,
                private modalController: ModalController,
                public alertController: AlertController,
                public changePage: ChangePageService) {

    }

    /**
     * Method to retrieve all of the user's 'Aufträge' when the page is loaded
     */
    async ionViewDidEnter() {
        this.gesucheArr = [];
        this.angeboteArr = [];
        this.intGesucheArr = [];
        this.intAngeboteArr = [];

        await this.authService.loadPageSubscription(u => {
            Object.assign(this.user, u);
        });
        this.angebotSub = this.angebotService.observableAngebote()
            .subscribe(() => {
                // angebotSub.unsubscribe();
                this.angeboteArr = [];
                this.intAngeboteArr = [];
                // fetch Angebote
                const tempErstellteAngebotArray: Angebot[] = [];
                const tempInteressierteAngebotArray: Angebot[] = [];

                this.user.erstellteAngebote.forEach(a => {
                    this.angebotService.findAngebotById(a).then(foundItem => {
                        tempErstellteAngebotArray.push(foundItem);
                    });
                });
                // fetch Angebote
                this.user.interessierteAngebote.forEach(a => {
                    this.angebotService.findAngebotById(a).then(foundItem => {
                        tempInteressierteAngebotArray.push(foundItem);
                    });
                });

                this.intAngeboteArr = tempInteressierteAngebotArray;
                this.angeboteArr = tempErstellteAngebotArray;
            });

        // this.gesuchSub.unsubscribe();
        this.gesuchSub = this.gesuchService.observableGesuch()
            .subscribe(() => {
                // this.gesuchSub.unsubscribe();
                this.gesucheArr = [];
                this.intGesucheArr = [];

                const tempErstellteGesucheArray: Gesuch[] = [];
                const tempInteressierteGesucheArray: Gesuch[] = [];

                // fetch Gesuche
                this.user.erstellteGesuche.forEach(g => {
                    this.gesuchService.findGesuchById(g).then(foundItem => {
                        tempErstellteGesucheArray.push(foundItem);
                    });
                });
                // fetch Gesuche
                this.user.interessierteGesuche.forEach(g => {
                    this.gesuchService.findGesuchById(g).then(foundItem => {
                        tempInteressierteGesucheArray.push(foundItem);
                    });
                });
                this.gesucheArr = tempErstellteGesucheArray;
                this.intGesucheArr = tempInteressierteGesucheArray;
            });
    }

    /**
     * Method to display a modal to edit a 'Gesuch'
     * @param gesuch the 'Gesuch' to be edited
     * @param detailmode if true, the 'Gesuch' is readonly
     * @param editmode if true, the 'Gesuch' is editable
     */
    async openGesuchedetails(gesuch: Gesuch, detailmode: boolean, editmode: boolean) {
        const modal = await this.modalController.create({
            component: GesuchedetailsComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                gesuch,
                detailmode,
                editmode
            }
        });
        await modal.present();
        await modal.onDidDismiss().then( () => {
            this.gesuch = new Gesuch();
        });
    }

    /**
     * Method to display a modal to edit an 'Angebot'
     * @param angebot the 'Angebot' to be edited
     * @param detailmode if true, the 'Angebot' is readonly
     * @param editmode if true, the 'Angebot' is editable
     */
    async openAngebotdetails(angebot: Angebot, detailmode: boolean, editmode: boolean) {
        const modal = await this.modalController.create({
            component: AngebotedetailsComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                angebot,
                detailmode,
                editmode
            }
        });
        await modal.present();
        await modal.onDidDismiss().then( () => {
            this.angebot = new Angebot();
        });
    }

    async openAngebotAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Kein Fahrzeug vorhanden!',
            message: 'Um eine Suche einzustellen muss ein Fahrzeug im Profil hinterlegt sein.',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {}
                }, {
                    text: 'zum Profil',
                    handler: () => {
                        this.changePage.route('profile');
                    }
                }
            ]
        });
        if (this.user.fahrzeuge.length === 0) {
            await alert.present();
        } else {
            this.openAngebotdetails(this.angebot, false, false);
        }
    }

    /**
     * method to clear all arrays and unsubscribe from all observables
     */
    ionViewDidLeave() {
        this.gesucheArr = [];
        this.angeboteArr = [];
        this.intGesucheArr = [];
        this.intAngeboteArr = [];

        this.authService.subUser.unsubscribe();
        this.angebotSub.unsubscribe();
        this.gesuchSub.unsubscribe();
    }

}
