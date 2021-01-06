import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AngebotCardComponent} from './angebot-card/angebot-card.component';
import {ProfilPopoverComponent} from './profil-popover/profil-popover.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FahrzeugdetailsComponent} from './fahrzeugdetails/fahrzeugdetails.component';
import {FormsModule} from '@angular/forms';
import {GesuchCardComponent} from './gesuch-card/gesuch-card.component';
import {AddFahrzeugModalComponent} from './add-fahrzeug-modal/add-fahrzeug-modal.component';
import {AddLieferobjektModalComponent} from './add-lieferobjekt-modal/add-lieferobjekt-modal.component';

@NgModule({
    declarations: [AngebotCardComponent, GesuchCardComponent, ProfilPopoverComponent, NavbarComponent,
        AddFahrzeugModalComponent, AddLieferobjektModalComponent, FahrzeugdetailsComponent],
    imports: [CommonModule, IonicModule, RouterModule, FormsModule],
    exports: [AngebotCardComponent, GesuchCardComponent, ProfilPopoverComponent, NavbarComponent,
        AddFahrzeugModalComponent, AddLieferobjektModalComponent, FahrzeugdetailsComponent]
})
export class SharedModule {
}
