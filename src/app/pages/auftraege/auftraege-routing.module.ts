import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuftraegePage } from './auftraege.page';

const routes: Routes = [
  {
    path: '',
    component: AuftraegePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuftraegePageRoutingModule {}
