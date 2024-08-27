import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



interface rutas{
  nombre: string;
  icon: string;
  ruta: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {
  //se tuvo que cambiar el tipo de expresion del "rol" puesto que era un null
  //al ser un string ahora si manda un valor antes mandaba un "undefined"
  rol!:string;
  // vvvv vvvvv con este podremos bloquear la barra de menu
  login: boolean= false;
  constructor(
    private atS: AuthService,
    private frS: FirestoreService,
    private router: Router,
    private menuController: MenuController,
  ) {
    this.sendMenu();
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })

  }
  lista: rutas[]=[
    {
      nombre:'Perfil',
      icon:'person',
      ruta: '/perfil'
    },
    {
      nombre:'Citas',
      icon:'list',
      ruta: '/navegacion'
    },
    {
      nombre:'Justificantes',
      icon:'document',
      ruta: '/justificantes'
    },
    {
      nombre:'Pacientes',
      icon:'people',
      ruta:'/pacientes'
    },
    {
      nombre:'Agregar doctor',
      icon:'person-add',
      ruta:'/agregar-doc'
    }

  ]
  sendMenu(){
    return this.lista
  }
  ngOnInit() {
  }
  getDatosUser(uid:string){
    const path= 'Usuarios';
    const id= uid;
    this.frS.getDoc<User>(path,id).subscribe(res=>{
      console.log('El rol es ->',res)
      if(res){
        this.rol= res.perfil
        //vvvvvvvvvv este de abajo se impreme para poder ver el rol de usuario
        console.log(this.rol);
      }
    })

  }


  //----------------------------front-end----------------------------------//

  selected: string = 'option3'; // opción por defecto

  selectOption(option: string) {
    this.selected = option;
    console.log('aqui toy')
  }

  logout(){
    this.atS.logout();
    this.menuController.close();
    // Volver a la primera opción
    this.selected = 'option3';
    this.router.navigate(['/home'])
  }

}



