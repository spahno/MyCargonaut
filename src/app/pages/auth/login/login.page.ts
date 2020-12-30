import {Component, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';

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
                private router: Router) {
        if (authService.user) {
            this.router.navigate(['/profile']);
        }
    }

    async login() {
        this.errors.clear();

        await this.authService.signIn(this.email, this.password);

        if (!this.email) {
            this.errors.set('email', 'Email darf nicht leer sein!');
        } else if (!this.emailIsValid(this.email)) {
            this.errors.set('email', 'Fehlerhaftes Email Format!');
        }
        if (!this.password) {
            this.errors.set('password', 'Passwort darf nicht leer sein!');
        } else if (this.password.length < 6) {
            this.errors.set('password', 'Passwort muss mindestens 6 Zeichen besitzen!');
            /* } else if (error.code === 'auth/user-not-found') {
                this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');
            } else if (error.code === 'auth/wrong-password') {
                this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');*/
        }
        if (this.errors.size === 0) {
            await this.authService.signIn(this.email, this.password);
            await this.router.navigate(['/profile']);
        }
        this.email = '';
        this.password = '';
    }

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    ionViewDidEnter() {
        setTimeout(() => this.emailRef.setFocus(), 10);
    }

}
