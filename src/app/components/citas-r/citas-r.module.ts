import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasRPageRoutingModule } from './citas-r-routing.module';

import { CitasRPage } from './citas-r.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    CitasRPageRoutingModule,
    SharedModule
  ],
  declarations: [CitasRPage]
})
export class CitasRPageModule {}
