import {Component, Input} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user';
import {Gesuch} from '../../../models/Gesuch';
import {Angebot} from '../../../models/Angebot';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-profil-popover',
    templateUrl: './profil-popover.component.html',
    styleUrls: ['./profil-popover.component.scss'],
})
export class ProfilPopoverComponent {

    user: User;
    interessent: User;
    gesuchBool: boolean;
    @Input() gesuch?: Gesuch;
    @Input() angebot?: Angebot;

    constructor(private authService: AuthService,
                private modalController: ModalController) {
        // Object.assign(this.user, this.authService.user);
        this.gesuchBool = !!this.gesuch;
        if (this.gesuchBool) {
            // TODO - den jeweiligen Interessenten anzeigen
            // Object.assign(this.interessent, this.gesuch.interessenten[0]);
        } else {
            // Object.assign(this.interessent, this.angebot.interessenten[0]);
        }
    }

    async dismissClickPopover() {
        await this.modalController.dismiss();
    }
}
