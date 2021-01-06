import {Injectable} from '@angular/core';
import {ProfilPopoverComponent} from '../../app/components/profil-popover/profil-popover.component';
import {ModalController} from '@ionic/angular';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    userCollection: AngularFirestoreCollection<User>;

    constructor(public modalController: ModalController,
                private afs: AngularFirestore) {
        this.userCollection = this.afs.collection<User>('users');
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

    phoneNumberIsValid(phoneNumber: number) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(String(phoneNumber));
    }
}
