import {Component, Input, OnInit} from '@angular/core';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {Fahrzeug} from '../../../models/fahrzeug';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {Angebot} from '../../../models/Angebot';
import {ModalController} from '@ionic/angular';

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
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => {
            Object.assign(this.currentUser = u);
            console.log('user wird geholt: ' + this.currentUser.email);
            this.getUserFahrzeuge();
        });
    }

    getUserFahrzeuge() {
        console.log('getuserFahrzeuge wird ausgeführt');
        this.currentUser.fahrzeuge.forEach(fahrzeugID => {
            this.fahrzeugService.findFahrzeugById(fahrzeugID).subscribe(fahrzeug => {
                this.userFahrzeuge.push(fahrzeug);
                console.log(fahrzeug);
            });
        });
    }

    selectFahrzeug(fahrzeug: Fahrzeug) {
        this.modalController.dismiss(fahrzeug);
    }

}
