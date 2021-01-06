import {Component, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {ChangePageService} from '../../../../services/changePage/change-page.service';
import {ProfileService} from '../../../../services/profile/profile.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['../auth.scss'],
})
export class LoginPage implements ViewDidEnter {

    email: string;
    password: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('focus') private emailRef: IonInput;

    constructor(private authService: AuthService,
                private profileService: ProfileService,
                private changePage: ChangePageService) {

    }

    async login() {
        this.errors.clear();

        if (!this.email) {
            this.errors.set('email', 'Email darf nicht leer sein!');
        } else if (!this.profileService.emailIsValid(this.email)) {
            this.errors.set('email', 'Fehlerhaftes Email Format!');
        }
        if (!this.password) {
            this.errors.set('password', 'Passwort darf nicht leer sein!');
        } else if (this.password.length < 6) {
            this.errors.set('password', 'Passwort muss mindestens 6 Zeichen besitzen!');
        }

        await this.authService.signIn(this.email, this.password)
            .then(() => {
                this.changePage.route('profile');
                this.email = '';
                this.password = '';
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    this.errors.set('email', 'E-Mail oder Passwort wurde falsch eingegeben!');
                } else if (error.code === 'auth/invalid-email') {
                    this.errors.set('email', 'E-Mail oder Passwort wurde falsch eingegeben!');
                } else if (error.code === 'auth/wrong-password') {
                    this.errors.set('email', 'E-Mail oder Passwort wurde falsch eingegeben!');
                } else if (error.code === 'auth/argument-error') {
                    this.errors.set('email', 'E-Mail oder Passwort wurde falsch eingegeben!');
                }
            });
    }

    ionViewDidEnter() {
        if (this.authService.getUser()) {
            this.changePage.route('profile');
        }
        setTimeout(() => this.emailRef.setFocus(), 10);
    }

}
