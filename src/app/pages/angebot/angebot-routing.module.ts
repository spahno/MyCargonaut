import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngebotPage } from './angebot.page';

const routes: Routes = [
  {
    path: '',
    component: AngebotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngebotPageRoutingModule {}
