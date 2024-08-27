import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificantesPage } from './justificantes.page';

const routes: Routes = [
  {
    path: '',
    component: JustificantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificantesPageRoutingModule {}
