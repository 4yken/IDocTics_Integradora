import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesModalComponent } from './detalles-modal/detalles-modal.component';
import { PacientesModalComponent } from './pacientes-modal/pacientes-modal.component';
import { MenuComponent } from './menu/menu.component';

import { DetallesJmComponent } from './detalles-jm/detalles-jm.component';
import { ModalJComponent } from './modal-j/modal-j.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




//  RECUERDA QUE POR ALGO ESTAMOS USANDO UN MODULE COMPARTIDO DENTRO DE SHARED
// CASI EXPLOTA EL CODIGO POR CREAR UN SEGUNDO MODULE PARA "MODALJ" AQUI SE IMPORTAN TODAS LAS EXTENCIONES Y LIBRERIAS QUE UTILISES DENTRO DE SHARED
//COMO ES EL "REACTIVEFORMS O EL FORMSMODULE"

@NgModule({
  declarations: [
    //el declarations se usa para poder usar todos los compoentes que hayan dentro de la carpta shared
    HeaderComponent,
    ModalComponent,
    DetallesModalComponent,
    PacientesModalComponent,
    MenuComponent,
    ModalJComponent,
    DetallesJmComponent



  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    //se tuvo que incluir el forms module para poder usar el ngMudule
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[
    //exports para llamar desde fuera a los componentes
    HeaderComponent,
    ModalComponent,
    DetallesModalComponent,
    PacientesModalComponent,
    MenuComponent,
    ModalJComponent,
    DetallesJmComponent,

  ]
})
export class SharedModule { }
