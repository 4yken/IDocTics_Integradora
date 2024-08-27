import { User } from './../models/models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private atf:AngularFireAuth ) { }

  login(correo: string, password: string){
   return this.atf.signInWithEmailAndPassword(correo,password)
  }
  logout(){
    this.atf.signOut();
  }

  registrarUser(datos: User){
    return this.atf.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  stateUser(){
    return this.atf.authState
    //COMPUREBA EL ESTADO DE LOGEADO O NO
  }

}
