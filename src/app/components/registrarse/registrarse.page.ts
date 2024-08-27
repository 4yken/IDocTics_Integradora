import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  //AQUI EMPIEZA LA MAGIA B)
  form!: FormGroup;

  datos:User={
  nombres: '',
  apellidos: '',
  correo: '',
  uid: '',
  password: '',
  telefono: '',
  perfil: 'Paciente',
  num_seguro_social:'',
  matricula: '',
  cedula:'',
  }

  constructor(
    private fb: FormBuilder,
    //      ^^^^^^  ESTE ES EL QUE SE ENCARGA DEL FORMULARIO
    private aut: AuthService,
    private frS: FirestoreService,
    private tc: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    //AHORA YA NO USAMOS LOS MODELS QUE CREAMOS EN UN PRINCIPIO SI NO DIRECTAMENTE LOS CAMPOS DE FORM
    this.form=this.fb.group({
      uid: this.frS.getId(),
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      correo: ['',Validators.required],
      password: ['',Validators.required],
      telefono: ['',Validators.required],
      perfil: ['Paciente',Validators.required],
      matricula: ['',Validators.required],
      carrera: ['',Validators.required],
      num_seguro_social: ['',Validators.required]
    });
  }

  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Registrado con exito!',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  // async registrarse(){
  //   console.log('datos -> ',this.datos);
  //   const res= await this.aut.registrarUser(this.datos).catch(error =>{
  //     console.log('error');
  //   })
  //   if (res){
  //     console.log('Se creo el usuario con exito!');
  //     const path= 'Usuarios';
  //     const id= res.user?.uid!;
  //     //aqui daba un error raro por el "uid" mas sin embargo con el signo "!" se arreglo esto devido a que angular creyo que tamos tontos
  //     // de hecho no, lo que ocurre es que no aceptaba que fuera una variable de tipo void asi que lo forzamos con el "!""
  //     this.datos.uid=id;
  //     this.datos.password= '';
  //     await this.frS.createDoc(this.datos,path,id);

  //     this.correcto("bottom");
  //     this.router.navigate(['/home'])
  //   }
  // }

  async incorrecto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Error!! Datos incorrectos',
      duration: 2500,
      icon: 'alert-circle-outline',
      position:position,
    });
    await toast.present();
  }

  async registrarse(){
    console.log('Los datos del usuario son ->',this.form.value);
    const res= await this.aut.registrarUser(this.form.value).catch(error=>{
      console.log('Error');
      this.incorrecto("bottom");
    });
    if(res){
      console.log('Se creo un nuevo usuario con exito!');
      //DATOS DE FIREBASE
      const path='Usuarios';
      const id= res.user?.uid;
      //DATOS DE NUESTRO FORM
      const data= this.form.value;
      data.matricula=data.matricula.toUpperCase();
      data.uid=id;
      data.password='';
      await this.frS.createDoc(data,path,id!);
      this.correcto("bottom");
      this.router.navigate(['/home']);
    }
  }
}
