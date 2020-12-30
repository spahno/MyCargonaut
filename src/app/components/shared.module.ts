import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AnfrageCardComponent} from './anfrage-card/anfrage-card.component';
import {ProfilPopoverComponent} from './profil-popover/profil-popover.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [AnfrageCardComponent, ProfilPopoverComponent, NavbarComponent],
    imports: [CommonModule, IonicModule, RouterModule],
    exports: [AnfrageCardComponent, ProfilPopoverComponent, NavbarComponent]
})
export class SharedModule {
}
