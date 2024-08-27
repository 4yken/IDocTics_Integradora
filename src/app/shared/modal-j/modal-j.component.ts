import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';

//AQUI NACE DIOS!!!!!

@Component({
  selector: 'app-modal-j',
  templateUrl: './modal-j.component.html',
  styleUrls: ['./modal-j.component.scss'],
})
export class ModalJComponent implements OnInit {
  rol!: string;
  login: boolean = false;
  form!: FormGroup;
  //se declara este que es el que recibe el cuerpo de nuestro justificante
  @Input() body:any;
  constructor(
    private fb: FormBuilder,
    private mdc: ModalController,
    private frS: FirestoreService,
    private tc: ToastController,
  ) {
  }
  ngOnInit() {
    this.form=this.fb.group({
      id: this.frS.getId(),
      fecha_creacion:['',Validators.required],
      fecha_reincorporacion:['',Validators.required],
      nombre_paciente:['',Validators.required],
      apellidos_paciente:['',Validators.required],
      carrera:['',Validators.required],
      matricula:['',Validators.required],
      detalles:['',Validators.required],
      nombre_doctor:['',Validators.required],
    });
    //AL PARECER NO HAGARRO EN EL CONSTRUCTOR PERO SI EL INIT
    console.log(this.body);
    //PARA QUE SE MANDEN LAS PROPIEDADES AL FORMULARIO Y SE CAMBIEN SE USA EL FROM.RESET()
    if(this.body){
      this.form.reset(this.body);
    }
  }

  cerrar(){
    this.mdc.dismiss();
  }

  guardar(){
    console.log(
      'los datos son ->',this.form.value
    );
    //data viene siendo el body en nuestra consulta
    const data= this.form.value
    data.matricula=data.matricula.toUpperCase();
    //el path es el nombre de nuestra colleccion en firebase
    const path= 'Justificantes';
    this.frS.createDoc(data,path,data.id);
    this.mdc.dismiss();
  }

  a/* sync faltan (position:'bottom'){
    const toast= await this.tc.create({
      message:'Favor de completar todos los campos antes de guardar',
      duration: 3000,
      icon: 'alert-circle-outline',
      position:position
    });
    await toast.present();
  } */


  guardarE(form=this.body){
    console.log(
      'los datos son ->',this.form.value
    );
    const data= this.form.value
    const path= 'Justificantes';
    this.frS.createDoc(data,path,data.id);
    this.mdc.dismiss();
  }



}
