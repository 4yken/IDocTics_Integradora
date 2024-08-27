import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDocPageRoutingModule } from './agregar-doc-routing.module';

import { AgregarDocPage } from './agregar-doc.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    //DIOS
    FormsModule,
    ReactiveFormsModule,
    //
    IonicModule,
    FontAwesomeModule,
    AgregarDocPageRoutingModule,
    SharedModule,
  ],
  declarations: [AgregarDocPage]
})
export class AgregarDocPageModule {}
