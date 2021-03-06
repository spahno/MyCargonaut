import {Component, OnInit} from '@angular/core';
import {Fahrzeug} from '../../../models/fahrzeug';
import {AuthService} from '../../../services/auth/auth.service';
import {FahrzeugdetailsComponent} from '../../components/fahrzeugdetails/fahrzeugdetails.component';
import {ModalController, ViewWillEnter} from '@ionic/angular';
import {User} from '../../../models/user';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {ProfileEditPage} from './profile-edit/profile-edit.page';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    public user: User = new User('', '', '', '');
    public subFahrzeuge;

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
                public modalController: ModalController,
                public fahrzeugService: FahrzeugService) {
    }

    /**
     * Loads the current user and all his Fahrzeuge
     */
    ngOnInit() {
        this.authService.loadPageSubscription(u => {
            Object.assign(this.user = u);
            this.getUserFahrzeuge();
        });
    }

    /**
     * Opens the Fahrzeugedetails Modal to add a Fahrzeug
     * @param fahrzeug is the fahrzeug passed to the modal
     * @param detailmode sets the inputs on readonly if true
     * @param editmode changes the save button in the modal
     */
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
        await modal.present();
        await modal.onDidDismiss().then( () => {
            this.car = new Fahrzeug();
            });
    }

    /**
     * Method to display a modal to edit the user's data
     */
    async openProfilBearbeiten() {
        const modal = await this.modalController.create({
            component: ProfileEditPage,
        });
        return await modal.present();
    }

    /**
     * Method that calls the 'deleteProfile()' method in the 'authService'
     */
    async delete() {
        await this.authService.deleteProfile();
    }

    /**
     * Method to retrieve all of te user's 'Fahrzeuge'
     */
    getUserFahrzeuge() {
        this.cars = [];
        this.user.fahrzeuge.forEach(id => {
            const sub = this.fahrzeugService.findFahrzeugById(id).subscribe(fahrzeug => {
                sub.unsubscribe();
                this.cars.push(fahrzeug);
            });
        });
    }

    /**
     * Deletes a Fahrzeug
     * @param fahrzeug the fahrzeug that is to be deleted
     */
    deleteFahrzeug(fahrzeug: Fahrzeug) {
        this.fahrzeugService.deleteFahrzeug(fahrzeug.id).then(() => {
            const user = this.authService.getUser();
            let fahrzeugIndex = user.fahrzeuge.indexOf(fahrzeug.id);
            user.fahrzeuge.splice(fahrzeugIndex, 1);
            this.authService.persist(user, user.id);
            fahrzeugIndex = this.cars.indexOf(fahrzeug);
            this.cars.splice(fahrzeugIndex, 1);
        });
    }
}
