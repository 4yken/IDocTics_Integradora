import { PacientesModalComponent } from './../../shared/pacientes-modal/pacientes-modal.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  login: boolean= false;
  rol!:string;
  pacientes: User[]=[];
  resp!: string;
  constructor(
    private atS: AuthService,
    private frS: FirestoreService,
    private mdC: ModalController
  ) {
    //es necesario usar este metodo para poder mandar a llamar las
    // acciones que nosotros declaremos
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })
   }

  ngOnInit() {
    this.loadPacientes();
  }

  buscar(ev:any){
    console.log(ev.detail.value);
    this.resp=ev.detail.value;
    this.resp=this.resp.toUpperCase();
    console.log(this.resp);
  }

  //muestra los pacientes
  loadPacientes(){
    this.frS.getPacientes().subscribe(
      (data:any) =>{
        console.log(data);
        this.pacientes = data;
      }
    )
  }
  async verDetalles(paciente: User){
    console.log('ver detalles de ->', paciente);
    const modal= await this.mdC.create({
      component: PacientesModalComponent,
      componentProps:{
        paciente
      }
    });
    return await modal.present();
  }
  getDatosUser(uid:string){
    const path= 'Usuarios';
    const id= uid;
    this.frS.getDoc<User>(path,id).subscribe(res=>{
      if(res){
        this.rol= res.perfil
      }
    })
  }
}
