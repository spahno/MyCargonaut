import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AnfrageCardComponent} from './anfrage-card/anfrage-card.component';
import {ProfilPopoverComponent} from './profil-popover/profil-popover.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FahrzeugdetailsComponent} from './fahrzeugdetails/fahrzeugdetails.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AnfrageCardComponent, ProfilPopoverComponent, NavbarComponent, FahrzeugdetailsComponent],
    imports: [CommonModule, IonicModule, RouterModule, FormsModule],
    exports: [AnfrageCardComponent, ProfilPopoverComponent, NavbarComponent, FahrzeugdetailsComponent]
})
export class SharedModule {
}
