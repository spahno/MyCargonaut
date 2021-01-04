import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AngebotCardComponent} from './angebot-card/angebot-card.component';
import {ProfilPopoverComponent} from './profil-popover/profil-popover.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {GesuchCardComponent} from './gesuch-card/gesuch-card.component';

@NgModule({
    declarations: [AngebotCardComponent, GesuchCardComponent, ProfilPopoverComponent, NavbarComponent],
    imports: [CommonModule, IonicModule, RouterModule],
    exports: [AngebotCardComponent, GesuchCardComponent, ProfilPopoverComponent, NavbarComponent]
})
export class SharedModule {
}
