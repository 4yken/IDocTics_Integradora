import { Citas } from './../../models/models';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.component.html',
  styleUrls: ['./detalles-modal.component.scss'],
})
export class DetallesModalComponent implements OnInit {
  @Input() cita!:Citas;
  newCita!: Citas;

  constructor(
    private frS: FirestoreService,
    private mdC: ModalController
  ) { }

  ngOnInit() {
    console.log('var es ->', this.cita);
  }
  cerrar(){
    this.mdC.dismiss();
  }

}
