import {Component, ViewChild} from '@angular/core';
import {IonInput, ModalController, ViewDidEnter} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {ProfileService} from '../../../../services/profile/profile.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.page.html',
    styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements ViewDidEnter {

    errors: Map<string, string> = new Map<string, string>();
    @ViewChild('focus') private phoneRef: IonInput;

    constructor(public modalCtrl: ModalController,
                private profileService: ProfileService,
                public authService: AuthService) {
    }

    save() {
        this.errors.clear();


        if (!this.authService.user.username) {
            this.errors.set('username', 'Nutzername darf nicht leer sein!');
        }
        if (!this.authService.user.vorname) {
            this.errors.set('firstname', 'Vorname darf nicht leer sein!');
        }
        if (!this.authService.user.nachname) {
            this.errors.set('lastname', 'Nachname darf nicht leer sein!');
        }
        if (!this.profileService.phoneNumberIsValid(this.authService.user.telefon)) {
            this.errors.set('telefon', 'Telefonnummer hat ein falsches Format!');
        }

        if (this.errors.size === 0) {
            this.authService.updateUser(this.authService.user)
                .then(() => {
                    this.modalCtrl.dismiss();
                });
        }
    }

    ionViewDidEnter() {
        setTimeout(() => this.phoneRef.setFocus(), 10);
    }
}
