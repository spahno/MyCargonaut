import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuchenPageRoutingModule } from './suchen-routing.module';

import { SuchenPage } from './suchen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuchenPageRoutingModule
  ],
  declarations: [SuchenPage]
})
export class SuchenPageModule {}
