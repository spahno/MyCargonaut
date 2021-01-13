import {Component, Input, OnInit} from '@angular/core';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {Fahrzeug} from '../../../models/fahrzeug';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {Angebot} from '../../../models/Angebot';
import {ModalController} from '@ionic/angular';
import {ChangePageService} from '../../../services/changePage/change-page.service';

@Component({
    selector: 'app-add-fahrzeug-modal',
    templateUrl: './add-fahrzeug-modal.component.html',
    styleUrls: ['./add-fahrzeug-modal.component.scss'],
})
export class AddFahrzeugModalComponent implements OnInit {

    /**
     * Angebot that is passed to the form
     */
    @Input() angebot: Angebot = new Angebot();
    /**
     * the user and his fahrzeuge to be passed
     * to the AddFahrzeugModal component
     */
    userFahrzeuge: Fahrzeug[] = [];
    currentUser: User = new User('', '', '', '');

    constructor(private fahrzeugService: FahrzeugService,
                private authService: AuthService,
                public modalController: ModalController,
                public changePage: ChangePageService) {
    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => {
            Object.assign(this.currentUser = u);
            this.getUserFahrzeuge();
        });
    }

    getUserFahrzeuge() {
        this.currentUser.fahrzeuge.forEach(fahrzeugID => {
            this.fahrzeugService.findFahrzeugById(fahrzeugID).subscribe(fahrzeug => {
                this.userFahrzeuge.push(fahrzeug);
            });
        });
    }

    selectFahrzeug(fahrzeug: Fahrzeug) {
        this.modalController.dismiss(fahrzeug);
    }

    dismissModal() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            dismissed: true
        });
    }
}
