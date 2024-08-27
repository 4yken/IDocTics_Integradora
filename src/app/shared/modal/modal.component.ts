import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Citas, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() cita!:Citas;
  @Input() body:any;
  rol!:string;
  login: boolean=false;
  newCita!: Citas;
  form!: FormGroup;
  // aqui var daba un error pero con un ! se quita

  constructor(
    private mdC: ModalController,
    private frS: FirestoreService,
    private aut: AuthService,
    private tc: ToastController,
    private fb: FormBuilder
  ) {
    this.aut.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })
  }

  ngOnInit() {

    console.log('var es ->', this.cita);

    this.form=this.fb.group({
      id: this.frS.getId(),
      nombre_paciente:['',Validators.required],
      apellidos_paciente: ['',Validators.required],
      matricula: ['',Validators.required],
      nombre_doctor: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],
      detalles: ['',Validators.required],
      medicamentos: ['',Validators.required],
      enfermedad: ['',Validators.required],
      estado:[false,Validators.required]
    });

    console.log(this.body);
    if(this.body){
      this.form.reset(this.body);
    }
  }

  cerrar(){
    this.mdC.dismiss();
  }
  guardar(){
    console.log('Los datos son->', this.form.value);
    const data= this.form.value;
    data.matricula=data.matricula.toUpperCase();
    //se señala a que coleccion pertenece
    const path= 'Citas';
    if(this.rol==='Doctor'){
      data.estado=true;
      this.frS.createDoc(data,path,data.id);
      //tecnicamente estamos reutilizando la peticion de crear pero al haber un id existente
      //se sobreescribe la informacion
    }else{;
      this.frS.createDoc(data, path,data.id);
    }
    this.mdC.dismiss();
  }

/*   async faltan (position:'bottom'){
    const toast= await this.tc.create({
      message:'Favor de completar todos los campos antes de guardar',
      duration: 3000,
      icon: 'alert-circle-outline',
      position:position
    });
    await toast.present();
  } */

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
