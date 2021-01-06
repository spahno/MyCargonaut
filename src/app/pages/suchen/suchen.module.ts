import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuchenPageRoutingModule } from './suchen-routing.module';

import { SuchenPage } from './suchen.page';
import {SharedModule} from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SuchenPageRoutingModule,
        SharedModule
    ],
  declarations: [SuchenPage]
})
export class SuchenPageModule {}
