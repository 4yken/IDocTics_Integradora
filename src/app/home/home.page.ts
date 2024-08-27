
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  estado: boolean= false;
  constructor(
    private afS: FirestoreService,
    private atS: AuthService,
    //con este vvvv podemos navegar entre paginas desde la funcionalidad
    private router:Router,
    private tc: ToastController,
    public ppc: PopoverController,
    //minuto 56:15

  ) {
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.estado= true;
        console.log('Estas Logeado');
      }else{
        console.log('No estas logeado');
      }
    })
  }

  //se estan creando bariables para almacenar el login
  credenciales={
    correo: null,
    password:null
  }

  ngOnInit(){}

  getUsuarios(){
    this.afS.getCollection()
  }

  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Bienvenido',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  async incorrecto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Error!! Correo o contraseña incorrectos',
      duration: 2500,
      icon: 'alert-circle-outline',
      position:position,
    });
    await toast.present();
  }

    async login(){
      //proceso que cacha los datos dentro del input
      console.log('credenciales -> ', this.credenciales);
      // la de arriba es una linea peligrosa por lo que revela las credenciales del usuario
      const res= await this.atS.login(this.credenciales.correo|| '{}',this.credenciales.password||'{}').catch(error=>{
        console.log('Error de autenticacion');
        this.incorrecto("bottom");
      });
      // aqui salia un error que decia que necesiba parametros diferentes al ser uno de tipo null pero por alguna razon al agregarle un
      // "||'{}'"" salio bien xd
      if (res){
        this.credenciales = {
          correo: null,
          password: null
        }
        console.log('res -> ',res);
        this.router.navigate(['/navegacion'])
        this.correcto("bottom");
      }
    }
}
