import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    PrincipalPageRoutingModule,
    SharedModule
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
