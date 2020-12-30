import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {AnfrageCardComponent} from './anfrage-card/anfrage-card.component';

@NgModule({
    declarations: [AnfrageCardComponent ],
    imports: [CommonModule, IonicModule],
    exports: [AnfrageCardComponent]
})
export class SharedModule {}
