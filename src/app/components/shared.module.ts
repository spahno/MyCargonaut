import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {AnfrageCardComponent} from './anfrage-card/anfrage-card.component';
import {ProfilPopoverComponent} from './profil-popover/profil-popover.component';

@NgModule({
    declarations: [AnfrageCardComponent, ProfilPopoverComponent],
    imports: [CommonModule, IonicModule],
    exports: [AnfrageCardComponent, ProfilPopoverComponent]
})
export class SharedModule {}
