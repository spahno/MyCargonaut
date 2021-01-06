import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuftraegePageRoutingModule } from './auftraege-routing.module';

import { AuftraegePage } from './auftraege.page';
import {SharedModule} from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuftraegePageRoutingModule,
        SharedModule
    ],
  declarations: [AuftraegePage]
})
export class AuftraegePageModule {}
