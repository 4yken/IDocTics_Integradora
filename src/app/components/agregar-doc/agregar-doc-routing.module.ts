import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDocPage } from './agregar-doc.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDocPageRoutingModule {}
