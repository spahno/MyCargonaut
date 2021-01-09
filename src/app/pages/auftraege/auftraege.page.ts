import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {Gesuch} from '../../../models/Gesuch';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {Fahrzeug} from '../../../models/fahrzeug';
import {FahrzeugdetailsComponent} from '../../components/fahrzeugdetails/fahrzeugdetails.component';
import {ModalController} from '@ionic/angular';
import {GesuchedetailsComponent} from '../../components/gesuchedetails/gesuchedetails.component';

@Component({
    selector: 'app-auftraege',
    templateUrl: './auftraege.page.html',
    styleUrls: ['./auftraege.page.scss'],
})
export class AuftraegePage implements OnInit {

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

    ngOnInit() {
        this.authService.loadPageSubscription(u => {
            Object.assign(this.user, u);
            this.angebotService.observableAngebote().subscribe(res => {
                this.angeboteArr = [];
                this.intAngeboteArr = [];
                // fetch Angebote
                this.user.erstellteAngebote.forEach(a => {
                    this.angebotService.findAngebotById(a).then(foundItem => {
                        this.angeboteArr.push(foundItem);
                    });
                });
                // fetch Angebote
                this.user.interessierteAngebote.forEach(a => {
                    this.angebotService.findAngebotById(a).then(foundItem => {
                        this.intAngeboteArr.push(foundItem);
                        console.log('Page Angebot' + foundItem.abfahrtOrt);
                    });
                });
            });
            this.gesuchService.observableGesuch().subscribe(res => {
                this.gesucheArr = [];
                this.intGesucheArr = [];

                // fetch Gesuche
                this.user.erstellteGesuche.forEach(g => {
                    this.gesuchService.findGesuchById(g).then(foundItem => {
                        this.gesucheArr.push(foundItem);
                    });
                });
                // fetch Gesuche
                this.user.interessierteGesuche.forEach(g => {
                    this.gesuchService.findGesuchById(g).then(foundItem => {
                        this.intGesucheArr.push(foundItem);
                    });
                });
            });
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
        return await modal.present();
    }

    async openAngebotdetails(angebot: Angebot, detailmode: boolean, editmode: boolean) {
        const modal = await this.modalController.create({
            component: FahrzeugdetailsComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                angebot,
                detailmode,
                editmode
            }
        });
        return await modal.present();
    }

}
