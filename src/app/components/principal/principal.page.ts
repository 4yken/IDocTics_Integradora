import { User, Citas } from './../../models/models';
import { IonModal, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import {OverlayEventDetail} from '@ionic/core/components';
import { AlertController } from '@ionic/angular';
import { resolve } from 'dns';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

// por alguna ^^^^^^^ razon no se pudo inportar  automaticamente este y tuvimos que hacerlo de manera manual

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombres!: string;
  apellidos!: string;
  matricula!: string;
  login: boolean= false;
  rol!: string;
  citas: Citas[]=[];
  //a este es al que llamamos para que nos muestre el contenido de la tabla
  newCita!: Citas;
  // con la variable de aca abajo podremos controllar los privilegios y roles de nuestros usuarios en un futuro
  //rol: 'Doctor'| 'Pasiente'= null;
  resp!:string;
  constructor(
    private router: Router,
    private atS: AuthService,
    //para navegar entre paginas
    private tc: ToastController,
    private frS: FirestoreService,
    private ac: AlertController,
    public mdC: ModalController
  ) {
    // esta operacion la usaremos cuando se implemente una barra de navegacion
    // video min 55:00
    this.atS.stateUser().subscribe(res=> {
      if(res){
        this.login= true;
        this.getDatosUser(res.uid);
      }
    })
  }



  ngOnInit() {
    this.loadCitasP();
  }
  buscar(ev:any){
    console.log(ev.detail.value);
    this.resp=ev.detail.value;
    this.resp=this.resp.toUpperCase();
    console.log(this.resp);
  }

/*
  // ESTO SE ENVIO AL HEADER PARA HACERLO MAS FACIL
  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se ha cerrado seccion con exito',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  logout(){
    this.atS.logout();
    this.correcto("bottom");
    this.router.navigate(['/home'])
  }
*/
  getDatosUser(uid: string){
    const path= 'Usuarios';
    const id= uid;
    this.frS.getDoc<User>(path,id).subscribe( res => {
      console.log('datos -> ', res);
      if(res){
        //JUSTO AQUI DEVERIA IR EL ROL por alguna razon  no haceta ser nulo asi que lo comentamos
        // la funcion de este procedimiento puede ayudarnos con un "ngIf" para mostrar siertas cosas que nostros queramos de acuerdo al roll  que tenga el usuario
       //this.rol=
       this.rol= res.perfil
       this.nombres= res.nombres
       this.apellidos= res.apellidos
       this.matricula= res.matricula
       console.log(this.rol);
       console.log(this.matricula);
       //se arreglo poniendole un ! como todo en la vida
      }
    })
  }

  loadCitasP(){

    //AQUI VA A RECIBIR LOS VERDADEROS VALORES DE LA BD
    // const path= 'Citas';
    // this.frS.getCollection<Citas>(path).subscribe(res => {
    //   if (res){
    //     this.citas = res;
    //   }
    // });

    this.frS.getCitas().subscribe(
      //con esta funcion llamamos a todas nuestras citas
      (_data:any) =>{
        console.log(_data);
        this.citas = _data;
      }

    )

    /*
    //EJEMPLOS DE CITAS ANTES DE USAR LA BD
    this.citas=[
      {
        nombre_paciente: 'uriel carrasco',
        fecha: '13-08-2022',
        hora: '13:09 hrs',
        estado:false,
        id: '12312'
      },
      {
        nombre_paciente: 'paco carrasco',
        fecha: '13-08-2022',
        hora: '13:09 hrs',
        estado:false,
        id: '12312'
      },
    ]
    */
  }

  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se ha registrado la cita con exito!',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  async eliminado(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se ha eliminado la cita con exito!',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
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


  //AQUI EMPIEZA EL CRUD
  //CORRECION AQUI EMPIEZA EL VIEJO MODAL
//  YA NO EXISTE XD


//FORMA ANTERIOR PARA EDITAR
 /* editar(cita: Citas){
    console.log('editar -> ',cita);
    this.newCita= cita;
  }
  */



  //AQUI SI EMPIEZA EL VERDADERO CRUD
async crearCita(){
  const modal= await this.mdC.create({
    component: ModalComponent
  });
  return await modal.present();
}

  // a comparacion del primer modal que funciona con ide y mas cosas este
  //se crea directamente de la libreria modelController y se tuvo que crear un modal
async  editar(body:any){
  console.log('ver detalles de ->',body);
  const modal= await this.mdC.create({
    component: ModalComponent,
    componentProps:{
      // el componentProps es el que recibe los datos que queremos mandar
      body
    }
  });
  return await modal.present();
}

async eliminar(id:string){
    const res = await this.deleteAlert();
    console.log('res ->', res);
    if(res){
      const path = 'Citas';
      this.frS.deleteDoc(path,id);
      this.eliminado("bottom");
    }
}

}
