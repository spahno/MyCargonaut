import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidEnter {

    mailForLogIn: string;
    passwordForLogIn: string;
    errors: Map<string, string> = new Map<string, string>();
    @ViewChild('email') private emailRef: IonInput;

    constructor(private authService: AuthService,
                public router: Router) {
        this.authService.refresh();
    }

    async login(mail: string, password: string) {
        this.errors.clear();
        await this.authService.login(mail, password)
            .catch((error) => {
                if (this.emailIsValid(mail)) {
                    this.errors.set('wrongData', 'Fehlerhaftes Email Format!');
                } else if (!mail && !password) {
                    this.errors.set('wrongData', 'E-Mail und Passwort darf nicht leer sein!');
                } else if (!mail) {
                    this.errors.set('wrongData', 'Email darf nicht leer sein!');
                } else if (!password) {
                    this.errors.set('wrongData', 'Passwort darf nicht leer sein!');
                } else if (password.length < 6) {
                    this.errors.set('wrongData', 'Passwort muss mindestens 6 Zeichen lang sein!');
                } else if (error.code === 'auth/user-not-found') {
                    this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');
                } else if (error.code === 'auth/wrong-password') {
                    this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');
                }
            });
    }

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    ionViewDidEnter() {
        setTimeout(() => this.emailRef.setFocus(), 10);
    }

}
