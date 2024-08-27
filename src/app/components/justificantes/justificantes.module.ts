import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificantesPageRoutingModule } from './justificantes-routing.module';

import { JustificantesPage } from './justificantes.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificantesPageRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [JustificantesPage]
})
export class JustificantesPageModule {}
