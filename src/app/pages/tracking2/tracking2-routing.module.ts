import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tracking2Page } from './tracking2.page';

const routes: Routes = [
  {
    path: '',
    component: Tracking2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tracking2PageRoutingModule {}
