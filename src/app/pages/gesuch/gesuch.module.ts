import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GesuchPageRoutingModule } from './gesuch-routing.module';

import { GesuchPage } from './gesuch.page';
import {SharedModule} from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GesuchPageRoutingModule,
        SharedModule
    ],
  declarations: [GesuchPage]
})
export class GesuchPageModule {}
