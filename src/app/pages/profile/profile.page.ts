import {Component, OnInit} from '@angular/core';
import {Fahrzeug} from '../../../models/fahrzeug';
import {AuthService} from '../../../services/auth/auth.service';
import {ProfileService} from '../../../services/profile/profile.service';
import {FahrzeugdetailsComponent} from '../../components/fahrzeugdetails/fahrzeugdetails.component';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    car: Fahrzeug = {
        nummernschild: '',
        marke: '',
        modell: '',
        fahrzeugart: '',
        farbe: '',
        baujahr: null,
        hoehe: null,
        breite: null,
        tiefe: null
    };

    cars: Fahrzeug[] = [];

    constructor(public authService: AuthService,
                public profileService: ProfileService,
                public modalController: ModalController) {
    }

    ngOnInit() {}

    async openFahrzeugdetails(fahrzeug: Fahrzeug, detailmode: boolean, editmode: boolean) {
        const modal = await this.modalController.create({
            component: FahrzeugdetailsComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                fahrzeug,
                detailmode,
                editmode
            }
        });
        return await modal.present();
    }

}
