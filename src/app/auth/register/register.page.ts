import {Component, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements ViewDidEnter {

    mail: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    errors: Map<string, string> = new Map<string, string>();
    @ViewChild('emailRef') private emailRef: IonInput;

    constructor(private authService: AuthService,
                public router: Router) {
        this.authService.refresh();
    }

    async signUp(mail: string, username: string, password: string) {
        this.errors.clear();

        if (!username) {
            this.errors.set('username', 'Nutzername darf nicht leer sein!');
        } else if (!mail) {
            this.errors.set('mail', 'Email darf nicht leer sein!');
        } else if (!this.emailIsValid(mail)) {
            this.errors.set('mail', 'Fehlerhaftes E-Mail Format!');
        } else if (password.length < 6) {
            this.errors.set('password', 'Passwort muss mindestens 6 Zeichen besitzen!');
        } else if (!password) {
            this.errors.set('password', 'Passwort darf nicht leer sein!');
        } else if (password !== this.passwordConfirmation) {
            this.errors.set('passwordConfirmation', 'Passwörter stimmen nicht überein!');
        }

        if (this.errors.size === 0) {
            await this.authService.register(mail, username, password);
        }
    }

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    ionViewDidEnter() {
        setTimeout(() => this.emailRef.setFocus(), 10);
    }


}
