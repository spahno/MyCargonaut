import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Fahrzeug} from '../../../models/fahrzeug';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    testUser: User;
    car: Fahrzeug = {
        nummernschild: 'LDKRL777',
        marke: 'Audi',
        modell: 'A4',
        fahrzeugart: 'Limousine',
        farbe: 'silber',
        baujahr: 2020,
        ladeflaeche: [{hoehe: 75, breite: 180, tiefe: 180}]
    };
    cars: Fahrzeug[] = [];

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.testUser = {
            id: 'lol',
            username: 'max power',
            vorname: 'max',
            nachname: 'mustermann',
            email: 'maxpower@mail.com',
            bewertung: 0,
            fahrzeuge: [],
            angebote: [],
            gesuche: [],
            anfragen: []
        };
        this.cars.push(this.car);
    }

}
