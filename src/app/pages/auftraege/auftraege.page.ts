import {Component} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {Gesuch} from '../../../models/Gesuch';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {ModalController, ViewDidEnter, ViewDidLeave} from '@ionic/angular';
import {GesuchedetailsComponent} from '../../components/gesuchedetails/gesuchedetails.component';
import {AngebotedetailsComponent} from '../../components/angebotedetails/angebotedetails.component';
import {Subscription} from 'rxjs';

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
                private modalController: ModalController) {

    }

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
                        console.log('Page Angebot' + foundItem.abfahrtOrt);
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
