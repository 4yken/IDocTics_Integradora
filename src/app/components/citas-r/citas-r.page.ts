import { DetallesModalComponent } from './../../shared/detalles-modal/detalles-modal.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Citas, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-citas-r',
  templateUrl: './citas-r.page.html',
  styleUrls: ['./citas-r.page.scss'],
})
export class CitasRPage implements OnInit {
  rol!:string;
  matricula!:string;
  login: boolean=false;
  citas: Citas[]=[];
  resp!:string;

  constructor(
    private atS: AuthService,
    private frS: FirestoreService,
    private mdC: ModalController
  ) {
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })
   }

  ngOnInit() {
    this.loadCitasR();
  }

  buscar(ev:any){
    console.log(ev.detail.value);
    this.resp=ev.detail.value;
    this.resp=this.resp.toUpperCase();
    console.log(this.resp);
  }

  //mostramos todas las citas
  loadCitasR(){
    this.frS.getCitas().subscribe(
      (data: any) =>{
        console.log(data);
        this.citas= data;
      }
    )
  }
  async verDetalles(cita: Citas){
    console.log('ver detalles de ->',cita);
    const modal= await this.mdC.create({
      component: DetallesModalComponent,
      componentProps:{
        cita
      }
    });
    return await modal.present();
  }
  getDatosUser(uid:string){
    const path='Usuarios';
    const id=uid;
    this.frS.getDoc<User>(path,id).subscribe(res=>{
      if(res){
        this.rol=res.perfil
        this.matricula=res.matricula
        console.log(this.matricula);
      }
    })
  }

}
