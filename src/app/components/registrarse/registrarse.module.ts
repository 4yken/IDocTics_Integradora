import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarsePageRoutingModule } from './registrarse-routing.module';

import { RegistrarsePage } from './registrarse.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RegistrarsePageRoutingModule,

    //EH AQUI EL DUO DE DIOS
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [RegistrarsePage]
})
export class RegistrarsePageModule {}
