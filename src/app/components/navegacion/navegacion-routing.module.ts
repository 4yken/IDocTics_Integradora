import { CitasRPageModule } from './../citas-r/citas-r.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavegacionPage } from './navegacion.page';

const routes: Routes = [
  {
    path: '',
    component: NavegacionPage,
    children:[
      {
        path: 'principal',
        //este se llama principal pero realmente es el de citas xd
        loadChildren: () => import('../principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path:'justificantes',
        loadChildren: () => import('../citas-r/citas-r-routing.module').then(m => m.CitasRPageRoutingModule)
      },
      {
        path: '',
        redirectTo: '/navegacion/principal',
        pathMatch: 'full'
      }
    ] 
  },
  {
  path: '',
        redirectTo: '/navegacion/principal',
        pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavegacionPageRoutingModule {}
