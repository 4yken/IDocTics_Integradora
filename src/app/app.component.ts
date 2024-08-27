import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

interface menu{
  nombre: string;
  icon: string;
  ruta: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  estado: boolean=false;
  lista: menu[]=[];
  constructor(

    private atS: AuthService
    ) {
    this.atS.stateUser().subscribe(res=>{
      if(res){
        this.estado= true;
      }else{
        this.estado=false;
      }
    })
  }
}
