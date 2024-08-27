import { Citas, User } from './../models/models';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  //se creo la carpeta de services y el archivo firestore
  constructor(
    private afs: AngularFirestore,
    private fire: Firestore,
    // este amiguito es el que ^^^^^^^tiene todas las propiedades del firebase
    //en el video que me guie el chico se refiere "firebase" a la propiedad que yo llame "afs"
    ) { }
    

    
  createDoc(data: any, path: string, id:string){
    const collection= this.afs.collection(path);
    return collection.doc(id).set(data);
  }


  getCollection(){
    console.log('Estoy por leer una coleccion');
    this.afs.collection('Usuarios').valueChanges().subscribe( (res) => {
      //                 AQUI TIENE QUE IR SEPARADO ^^^^^^^^^^ PQ SALE ERROR
      console.log('res -> ',res);
    });
  }

  

  getDoc<tipo>(path: string, id: string){
    return this.afs.collection(path).doc<tipo>(id).valueChanges()
  }

  getId(){
    return this.afs.createId();
  }

  deleteDoc(path: string, id: string){
    return this.afs.collection(path).doc(id).delete();
  }

  getCitas() : Observable<Citas[]>  {
    const citasRef = collection(this.fire, 'Citas');
    return collectionData(citasRef, {idField:'id'}) as Observable<Citas[]>;
  }

  getPacientes(): Observable<User[]>{
    const pacientesRef= collection(this.fire,'Usuarios');
    return collectionData(pacientesRef,{idField:'id'})as Observable<User[]>;
  }

  getJust(){
    const justificantesRef= collection(this.fire,'Justificantes');
    return collectionData(justificantesRef,{idField:'id'})
  }
  
  getJustByName(){
    
  }

  async updateDoc(path: string, id: string ){
    return await this.afs.collection(path).doc(id).update;
  }
}
