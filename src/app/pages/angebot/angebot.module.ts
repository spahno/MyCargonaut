import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AngebotPageRoutingModule } from './angebot-routing.module';

import { AngebotPage } from './angebot.page';
import {SharedModule} from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngebotPageRoutingModule,
        SharedModule
    ],
  declarations: [AngebotPage]
})
export class AngebotPageModule {}
