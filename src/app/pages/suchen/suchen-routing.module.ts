import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuchenPage } from './suchen.page';

const routes: Routes = [
  {
    path: '',
    component: SuchenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuchenPageRoutingModule {}
