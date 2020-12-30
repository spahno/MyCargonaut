import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GesuchPage } from './gesuch.page';

const routes: Routes = [
  {
    path: '',
    component: GesuchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GesuchPageRoutingModule {}
