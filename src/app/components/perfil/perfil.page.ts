import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  login: boolean= false;
  rol!: string;
  nombres!: string;
  apellidos!: string;
  correo!: string;
  uid!: string;
  telefono!:string;
  num_seguro_social?:string;
  matricula!: string;
  cedula?:string;
  carrera!:string;
  constructor(
    private frS: FirestoreService,
    private atS: AuthService
  ) {
    this.atS.stateUser().subscribe( res =>{
      if(res){
        this.login= true;
        this.getDatosUser(res.uid)
      }
    })
   }

  ngOnInit() {

  }
  getDatosUser(uid:string){
    const path= 'Usuarios';
    const id= uid;
    this.frS.getDoc<User>(path, id).subscribe(res =>{
      console.log('datos -> ', res)
      if(res){
        this.rol= res.perfil
        //creo que el error de no poder leer el valor de tipo "rol" es devido a que antes
        //yo le ponia un "!" para evitar que saliera un error pero ahora que se cambio de un tipo null a un tipo string las cosas cambiaron
        this.nombres= res.nombres
        this.apellidos= res.apellidos
        this.correo= res.correo
        this.uid=res.uid
        this.telefono=res.telefono
        this.carrera=res.carrera
        this.num_seguro_social=res.num_seguro_social
        this.cedula=res.cedula
        this.matricula =res.matricula
        console.log(this.rol);
        console.log(this.matricula);
      }
    })
  }

}
