import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-jm',
  templateUrl: './detalles-jm.component.html',
  styleUrls: ['./detalles-jm.component.scss'],
})
export class DetallesJmComponent implements OnInit {
  @Input() body:any;
  constructor(
    private mdc: ModalController
  ) { }

  ngOnInit() {
    console.log(this.body);
  }
  cerrar(){
    this.mdc.dismiss();
  }

}
