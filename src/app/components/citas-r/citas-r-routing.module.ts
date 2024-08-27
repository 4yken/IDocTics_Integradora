import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasRPage } from './citas-r.page';

const routes: Routes = [
  {
    path: '',
    component: CitasRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRPageRoutingModule {}
