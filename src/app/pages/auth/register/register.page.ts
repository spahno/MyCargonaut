import {Component, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {ChangePageService} from '../../../../services/changePage/change-page.service';
import {ProfileService} from '../../../../services/profile/profile.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['../auth.scss'],
})
export class RegisterPage implements ViewDidEnter {

    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    passwordConfirmation: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('focus') private emailRef: IonInput;

    constructor(private authService: AuthService,
                private profileService: ProfileService,
                private changePage: ChangePageService) {

    }

    async register() {
        this.errors.clear();

        if (!this.email) {
            this.errors.set('email', 'Email darf nicht leer sein!');
        } else if (!this.profileService.emailIsValid(this.email)) {
            this.errors.set('email', 'Fehlerhaftes Email Format!');
        }
        if (!this.username) {
            this.errors.set('username', 'Nutzername darf nicht leer sein!');
        }
        if (!this.firstname) {
            this.errors.set('firstname', 'Vorname darf nicht leer sein!');
        }
        if (!this.lastname) {
            this.errors.set('lastname', 'Nachname darf nicht leer sein!');
        }
        if (!this.password) {
            this.errors.set('password', 'Passwort darf nicht leer sein!');
        } else if (this.password.length < 6) {
            this.errors.set('password', 'Passwort muss mindestens 6 Zeichen besitzen!');
        } else if (!this.passwordConfirmation) {
            this.errors.set('passwordConfirmation', 'Bitte bestätigen Sie das Passwort!');
        } else if (this.password !== this.passwordConfirmation) {
            this.errors.set('passwordConfirmation', 'Passwörter stimmen nicht überein!');
        }
        if (this.errors.size === 0) {
            await this.authService.signUp(this.email, this.username, this.firstname, this.lastname, this.password);
            await this.changePage.route('profile');
        }

        this.email = '';
        this.username = '';
        this.firstname = '';
        this.lastname = '';
        this.password = '';
        this.passwordConfirmation = '';
    }

    ionViewDidEnter() {
        if (this.authService.getUser()) {
            this.changePage.route('profile');
        }
        setTimeout(() => this.emailRef.setFocus(), 10);
    }
}
