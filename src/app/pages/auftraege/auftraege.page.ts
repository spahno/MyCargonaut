import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {Gesuch} from '../../../models/Gesuch';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';

@Component({
    selector: 'app-auftraege',
    templateUrl: './auftraege.page.html',
    styleUrls: ['./auftraege.page.scss'],
})
export class AuftraegePage implements OnInit {

    user: User = new User('', '', '', '');
    gesucheArr: Gesuch[] = [];
    angeboteArr: Angebot[] = [];
    intGesucheArr: Gesuch[] = [];
    intAngeboteArr: Angebot[] = [];


    constructor(private authService: AuthService,
                private gesuchService: GesuchService,
                private angebotService: AngebotService) {

    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => {
            Object.assign(this.user, u);
            this.gesucheArr = [];
            this.angeboteArr = [];
            this.intGesucheArr = [];
            this.intAngeboteArr = [];

            // fetch Gesuche
            this.user.erstellteGesuche.forEach(g => {
                this.gesuchService.findGesuchById(g).then(foundItem => {
                    this.gesucheArr.push(foundItem);
                });
            });

            // fetch Angebote
            this.user.erstellteAngebote.forEach(a => {
                this.angebotService.findAngebotById(a).then(foundItem => {
                    this.angeboteArr.push(foundItem);
                });
            });

            // fetch Gesuche
            this.user.interessierteGesuche.forEach(g => {
                this.gesuchService.findGesuchById(g).then(foundItem => {
                    this.intGesucheArr.push(foundItem);
                });
            });

            // fetch Angebote
            this.user.interessierteAngebote.forEach(a => {
                this.angebotService.findAngebotById(a).then(foundItem => {
                    this.intAngeboteArr.push(foundItem);
                    console.log('Page Angebot' + foundItem.abfahrtOrt);
                });
            });
        });

    }

}
