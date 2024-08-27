import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';

import { FirestoreService } from 'src/app/services/firestore.service';
import { DetallesJmComponent } from 'src/app/shared/detalles-jm/detalles-jm.component';
import { ModalJComponent } from 'src/app/shared/modal-j/modal-j.component';


//dependencias del pdf: se tuvo que eliminar una linea de "restrict" en el archivo "tsconfig.json" por que daba error y no permitia agregar dichas dependencias
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-justificantes',
  templateUrl: './justificantes.page.html',
  styleUrls: ['./justificantes.page.scss'],
})
export class JustificantesPage implements OnInit {
  //al parecer deve ser any
  certificados:any []=[];
  rol!:string;
  matricula!:string;
  login: boolean=false;
  resp!:string;
  constructor(
    private mdc: ModalController,
    private frS: FirestoreService,
    private ac: AlertController,
    private tc: ToastController,
    private rt: Router,
    private atS: AuthService,
  ) {
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })
   }

  ngOnInit() {
    this.loadJust();
  }
  //CREACION DEL PDF
  createPdf(c:any){
    console.log(c);
    const pdfDefinition: any={
      content:[
        {
          text:'CERTIFICADO MEDICO',
          style: 'title',
          alignment: 'center'
        },
        {
          text: '∖n ∖n'
        },
        {
          text:'De la fecha '+c.fecha_creacion+ ' a la fecha'+ c.fecha_reincorporacion,
          style:'header'
        },
        'El alumno '+c.nombre_paciente+ ' de la carrera '+c.carrera+ ' con la matricula '+c.matricula+' se vera ausente por las siguientes circunstancias:'
        ,{
          alignment: 'justify',
          text: c.detalles
        },
        {
          text: '∖n ∖n ∖n'
        },
        {
          alignment: 'center',
          text: 'Att. Dr./Dra. '+c.nombre_doctor
        }
      ],
      styles:{
        header: {
          fontSize:15,
          bold: true
        },
        title:{
          fontSize: 18,
          bold: true
        }
      }
    }
    const pdf= pdfMake.createPdf(pdfDefinition);
    pdf.download();
  }

  //BUSCADOR

  buscar(ev:any){
    console.log(ev.detail.value);
    this.resp=ev.detail.value;
    this.resp=this.resp.toUpperCase();
    console.log(this.resp);
  }

  async crearJust(){
    const modal= await this.mdc.create({
      component: ModalJComponent
    });
    return await modal.present();
  }
  async editar(body:any){
    const modal= await this.mdc.create({
      component:ModalJComponent,
      componentProps:{
        body
      }
    });
    return await modal.present();
  }

  async deleteAlert(){
    let aceptar= false;
    const alert= await this.ac.create({
      backdropDismiss: false,
      header:'¿Seguro que desea eliminar?',
      buttons:[
        {
          text:'Confirmar',
          handler:()=>{
            console.log('Eliminado');
            aceptar= true;
          }
        },
        {
          text:'Cancelar',
          handler:()=>{
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    return aceptar
  }
  async eliminado(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se elimino un justificante con exito!',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  loadJust(){
    this.frS.getJust().subscribe(
      (data:any)=>{
        console.log(data);
        this.certificados=data;
      }
    )
  }

  async eliminar(id:string){
    const res= await this.deleteAlert();
    console.log('res->',res)
    if(res){
      const path= 'Justificantes';
      this.frS.deleteDoc(path,id);
      this.eliminado("bottom");
    }
  }

  async verDetalles(body:any){
    console.log(body);
    const modal= await this.mdc.create({
      component: DetallesJmComponent,
      componentProps:{
        body
      }
    });
    return await modal.present();
  }

  getDatosUser(uid:string){
    const path='Usuarios';
    const id= uid;
    this.frS.getDoc<User>(path,id).subscribe(res=>{
      console.log('datos->',res);
      if(res){
        this.rol=res.perfil;
        this.matricula=res.matricula;
        console.log(this.rol);
        console.log(this.matricula);
      }
    })
  }
}
