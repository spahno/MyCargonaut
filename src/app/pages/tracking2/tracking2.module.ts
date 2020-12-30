import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tracking2PageRoutingModule } from './tracking2-routing.module';

import { Tracking2Page } from './tracking2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tracking2PageRoutingModule
  ],
  declarations: [Tracking2Page]
})
export class Tracking2PageModule {}
