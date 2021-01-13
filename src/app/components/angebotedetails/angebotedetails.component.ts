import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {AddFahrzeugModalComponent} from '../add-fahrzeug-modal/add-fahrzeug-modal.component';
import {Fahrzeug} from '../../../models/fahrzeug';
import {User} from '../../../models/user';

@Component({
    selector: 'app-angebotedetails',
    templateUrl: './angebotedetails.component.html',
    styleUrls: ['./angebotedetails.component.scss'],
})
export class AngebotedetailsComponent implements OnInit {

    /**
     * Values that are passed to the form
     */
    @Input() angebot: Angebot = new Angebot();
    @Input() detailmode = null;
    @Input() editmode = null;

    user: User;
    ankunftNummer: number;
    abfahrtNummer: number;
    tabSwitch = 'start';
    now = new Date().getFullYear();
    endDate = new Date();
    angebotFahrzeug: Fahrzeug = new Fahrzeug();

    errors: Map<string, string> = new Map<string, string>();

    constructor(public modalController: ModalController,
                public angebotService: AngebotService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => this.user =  u);
    }

    /**
     * Checks all values and then either calls updateFahrzeug or addFahrzeug
     */
    async save() {
        this.errors.clear();
        this.angebot.ankunftDatum = new Date(this.endDate).toLocaleDateString('de-De', {year: 'numeric', month: '2-digit', day: '2-digit'});
        this.angebot.ankunftZeit = new Date(this.endDate).toLocaleTimeString('de-De', {hour: '2-digit', minute: '2-digit'});

        if (!this.angebot.ankunftDatum) {
            this.errors.set('ankunftDatum', 'Das Ankunftsdatum muss korrekt eingetragen werden!');
        }
        if (!this.angebot.ankunftZeit) {
            this.errors.set('ankunftZeit', 'Die Ankunftszeit muss korrekt eingetragen werden!');
        }
        if (!this.angebot.ankunftStrasse) {
            this.errors.set('ankunftStrasse', 'Das Ankunftsstraße muss korrekt eingetragen werden!');
        }
        if (!this.ankunftNummer) {
            this.errors.set('ankunftNummer', 'Die Hausnummer muss korrekt eingetragen werden!');
        }
        if (!this.angebot.ankunftPlz) {
            this.errors.set('ankunftPlz', 'Die Postleitzahl muss korrekt eingetragen werden!');
        }
        if (!this.angebot.ankunftOrt) {
            this.errors.set('ankunftOrt', 'Der Ankunftsort muss korrekt eingetragen werden!');
        }
        if (!this.angebot.abfahrtStrasse) {
            this.errors.set('abfahrtStrasse', 'Das Abfahrtstraße muss korrekt eingetragen werden!');
        }
        if (!this.abfahrtNummer) {
            this.errors.set('abfahrtNummer', 'Die Hausnummer muss korrekt eingetragen werden!');
        }
        if (!this.angebot.abfahrtPlz) {
            this.errors.set('abfahrtPlz', 'Die Postleitzahl muss korrekt eingetragen werden!');
        }
        if (!this.angebot.abfahrtOrt) {
            this.errors.set('abfahrtOrt', 'Der Abfahrtsort muss korrekt eingetragen werden!');
        }
        if (!this.angebot.bezahlung) {
            this.errors.set('bezahlung', 'Die Bezahlung muss korrekt eingetragen werden!');
        }
        if (!this.user) {
            this.errors.set('user', 'User undefined!');
        }

        if (this.errors.size === 0) {
            this.angebot.ankunftStrasse = this.angebot.ankunftStrasse + this.ankunftNummer;
            this.angebot.abfahrtStrasse = this.angebot.abfahrtStrasse + this.abfahrtNummer;
            this.angebot.erstellerId = this.authService.getUserID();

            if (this.editmode) {
                await this.angebotService.updateAngebot(this.angebot).then(res => {
                    const index = this.user.erstellteAngebote.indexOf(res.angebot._ID);
                    this.user.erstellteAngebote[index] = res.angebot._ID;
                    this.authService.updateUser(this.user);
                    this.errors.clear();
                    this.dismiss();
                });
                await this.authService.loadPageSubscription(u => this.user =  u);
            } else {
                await this.angebotService.addAngebot(this.angebot).then(res => {
                    this.user.erstellteAngebote.push(res.angebot._ID);
                    this.authService.updateUser(this.user);
                });
                await this.authService.loadPageSubscription(u => this.user =  u);
                this.errors.clear();
                this.dismiss();
            }
        }
    }

    /**
     * method to dismiss the modal
     */
    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.angebotFahrzeug = null;
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
    /**
     * method to open the modal
     */
    async openFahrzeugModal(angebot: Angebot) {
        const modal = await this.modalController.create({
            component: AddFahrzeugModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                angebot
            }
        });

        modal.onDidDismiss()
            .then((fahrzeug) => {
                this.angebotFahrzeug = fahrzeug.data;
                this.angebot.fahrzeugId = this.angebotFahrzeug.id;
            });

        return await modal.present();
    }

}
