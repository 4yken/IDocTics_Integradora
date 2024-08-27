import { FirestoreService } from 'src/app/services/firestore.service';
import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardGuard } from './guards/auth-guard.guard';

//1ER NIVEL DE SEGUIRDAD PROTECCION DE RUTAS CON EL AngularFireAuthGuard
const rolD= 'Doctor';

const Routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./components/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'navegacion',
    loadChildren: () => import('./components/navegacion/navegacion.module').then( m => m.NavegacionPageModule)
  },
  {
    path: 'justificantes',
    loadChildren: () => import('./components/justificantes/justificantes.module').then( m => m.JustificantesPageModule)
  },
  {
    path: 'citas-r',
    loadChildren: () => import('./components/citas-r/citas-r.module').then( m => m.CitasRPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./components/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./components/pacientes/pacientes.module').then( m => m.PacientesPageModule),

  },
  {
    path: 'agregar-doc',
    loadChildren: () => import('./components/agregar-doc/agregar-doc.module').then( m => m.AgregarDocPageModule)
  },
];


const routes: Routes = [
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
    //loadChildren: () => import('./componentes/inicio/inicio.component').then( m => m.InicioComponent)
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./components/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate:[AngularFireAuthGuard]
    //^^^^^^^^^^^^^^^^^ ESTA ES LA LINEA QUE SE ENCARGA DE PROTEGER LAS RUTAS
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./components/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'navegacion',
    loadChildren: () => import('./components/navegacion/navegacion.module').then( m => m.NavegacionPageModule),
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'justificantes',
    loadChildren: () => import('./components/justificantes/justificantes.module').then( m => m.JustificantesPageModule),
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'citas-r',
    loadChildren: () => import('./components/citas-r/citas-r.module').then( m => m.CitasRPageModule),
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./components/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[AngularFireAuthGuard]
    //...canActive(onlyAllowSelf)
    //ESTA FUNCION HARA QUE LA REGLA DE ACCESO SOLO SE MUESTRE AL DOCTOR
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./components/pacientes/pacientes.module').then( m => m.PacientesPageModule),
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'agregar-doc',
    loadChildren: () => import('./components/agregar-doc/agregar-doc.module').then( m => m.AgregarDocPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {

  constructor(
    private atS: AuthService,
    private frS: FirestoreService
  ){
  }
  ngOnInit(){
  }

 }
