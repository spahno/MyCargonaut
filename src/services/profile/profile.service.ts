import {Injectable} from '@angular/core';
import {ProfilPopoverComponent} from '../../app/components/profil-popover/profil-popover.component';
import {ModalController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(public modalController: ModalController) {
    }

    async presentPopoverProfile() {
        const modal = await this.modalController.create({
            component: ProfilPopoverComponent,
            cssClass: 'profil-popover.component.scss'
        });
        return await modal.present();
    }

    /*async presentPopoverProfile(ev: any) {
        const popover = await this.popoverController
            .create({
                component: ProfilPopoverComponent,
                event: ev,
                translucent: true,
                componentProps: {}
                // TODO - Interessenten übergeben
                // componentProps: {interessent: User}
            });
        return await popover.present();
    }*/

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }
}
