import {Component, Input} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {ModalController} from '@ionic/angular';
import {Fahrzeug} from '../../../models/fahrzeug';
import {Lieferobjekt} from '../../../models/Lieferobjekt';

@Component({
    selector: 'app-profil-popover',
    templateUrl: './profil-popover.component.html',
    styleUrls: ['./profil-popover.component.scss'],
})
export class ProfilPopoverComponent {
    /**
     * Values passed to the popover
     */
    @Input() interessent = new User( '', '', '', '');
    @Input() lieferobjekt: Lieferobjekt;
    @Input() fahrzeug: Fahrzeug;

    constructor(private authService: AuthService,
                private modalController: ModalController) {
    }

    /**
     * method to dismiss the modal
     */
    async dismissClickPopover() {
        await this.modalController.dismiss();
    }
}
