import {Component, Input, OnInit} from '@angular/core';
import {Gesuch} from '../../../models/Gesuch';
import {ModalController} from '@ionic/angular';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Lieferobjekt} from '../../../models/Lieferobjekt';
import {LieferobjektService} from '../../../services/lieferobjekt/lieferobjekt.service';
import {User} from '../../../models/user';

@Component({
    selector: 'app-gesuchedetails',
    templateUrl: './gesuchedetails.component.html',
    styleUrls: ['./gesuchedetails.component.scss'],
})
export class GesuchedetailsComponent implements OnInit {

    user: User;

    /**
     * Values that are passed to the form
     */
    @Input() gesuch: Gesuch = new Gesuch();
    @Input() detailmode = null;
    @Input() editmode = null;

    lieferobjekt: Lieferobjekt = new Lieferobjekt();
    ankunftNummer: number;
    abfahrtNummer: number;
    tabSwitch = 'start';
    now = new Date().getFullYear();
    endDate = new Date();

    errors: Map<string, string> = new Map<string, string>();

    constructor(public modalController: ModalController,
                public gesuchService: GesuchService,
                public authService: AuthService,
                private lieferobjektService: LieferobjektService) {
    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => this.user =  u);
    }

    /**
     * Checks all values and then either calls updateFahrzeug or addFahrzeug
     */
    async save() {
        this.errors.clear();
        this.gesuch.ankunftDatum = new Date(this.endDate).toLocaleDateString('de-De', {year: 'numeric', month: '2-digit', day: '2-digit'});
        this.gesuch.ankunftZeit = new Date(this.endDate).toLocaleTimeString('de-De', {hour: '2-digit', minute: '2-digit'});

        if (!this.gesuch.ankunftDatum) {
            this.errors.set('ankunftDatum', 'Das Ankunftsdatum muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.ankunftZeit) {
            this.errors.set('ankunftZeit', 'Die Ankunftszeit muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.ankunftStrasse) {
            this.errors.set('ankunftStrasse', 'Das Ankunftsstraße muss korrekt eingetragen werden!');
        }
        if (!this.ankunftNummer) {
            this.errors.set('ankunftNummer', 'Die Hausnummer muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.ankunftPlz) {
            this.errors.set('ankunftPlz', 'Die Postleitzahl muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.ankunftOrt) {
            this.errors.set('ankunftOrt', 'Der Ankunftsort muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.abfahrtStrasse) {
            this.errors.set('abfahrtStrasse', 'Das Abfahrtstraße muss korrekt eingetragen werden!');
        }
        if (!this.abfahrtNummer) {
            this.errors.set('abfahrtNummer', 'Die Hausnummer muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.abfahrtPlz) {
            this.errors.set('abfahrtPlz', 'Die Postleitzahl muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.abfahrtOrt) {
            this.errors.set('abfahrtOrt', 'Der Abfahrtsort muss korrekt eingetragen werden!');
        }
        if (!this.gesuch.bezahlung) {
            this.errors.set('bezahlung', 'Die Bezahlung muss korrekt eingetragen werden!');
        }
        if (!this.lieferobjekt.name) {
            this.errors.set('name', 'Der Titel muss korrekt eingetragen werden!');
        }
        if (!this.lieferobjekt.beschreibung) {
            this.errors.set('beschreibung', 'Die Beschreibung muss korrekt eingetragen werden!');
        }
        if (!this.lieferobjekt.preis) {
            this.errors.set('preis', 'Der Preis muss korrekt eingetragen werden!');
        }
        if (!this.user) {
            this.errors.set('user', 'User undefined!');
        }

        if (this.errors.size === 0) {
            this.gesuch.erstellerId = this.authService.getUserID();
            this.gesuch.ankunftStrasse = this.gesuch.ankunftStrasse + this.ankunftNummer;
            this.gesuch.abfahrtStrasse = this.gesuch.abfahrtStrasse + this.abfahrtNummer;
            if (this.editmode) {
                // await this.lieferobjektService.update(this.lieferobjekt).then(res =>
                //     this.gesuch.lieferobjektId = res.lieferobjekt._ID);
                await this.gesuchService.updateGesuch(this.gesuch).then(res => {
                    const index = this.user.erstellteAngebote.indexOf(res.gesuch._ID);
                    this.user.erstellteGesuche[index] = res.gesuch._ID;
                    this.authService.updateUser(this.user);
                    this.errors.clear();
                    this.dismiss();
                });
                await this.authService.loadPageSubscription(u => this.user =  u);
            } else {
                this.dismiss();
                this.errors.clear();
                await this.lieferobjektService.addLieferobjekt(this.lieferobjekt).then(res =>
                    this.gesuch.lieferobjektId = res.lieferobjekt._ID);
                await this.gesuchService.addGesuch(this.gesuch).then(res => {
                    this.user.erstellteGesuche.push(res.gesuch._ID);
                    this.authService.updateUser(this.user);
                });
                await this.authService.loadPageSubscription(u => this.user =  u);
            }
        }
    }

    /**
     * method to dismiss the modal
     */
    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    /**
     * Triggers when the segment is clicked to change filter string
     * @param ev the event that is triggered by clicking the segment button
     */
    segmentChanged(ev: any) {
        console.log(this.tabSwitch);
    }

}
