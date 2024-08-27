import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-pacientes-modal',
  templateUrl: './pacientes-modal.component.html',
  styleUrls: ['./pacientes-modal.component.scss'],
})
export class PacientesModalComponent implements OnInit {
  @Input() paciente!: User;
  constructor(
    private mdC: ModalController
  ) { }

  ngOnInit() {
    console.log('var es ->', this.paciente);
  }
  cerrar(){
    this.mdC.dismiss();
  }

}
