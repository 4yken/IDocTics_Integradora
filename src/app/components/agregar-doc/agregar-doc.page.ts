import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-doc',
  templateUrl: './agregar-doc.page.html',
  styleUrls: ['./agregar-doc.page.scss'],
})
export class AgregarDocPage implements OnInit {
  login:boolean= false;
  rol!:string;
  form!: FormGroup;

  datos:User={
    nombres: '',
    apellidos: '',
    correo: '',
    uid: '',
    password: '',
    telefono: '',
    perfil: 'Doctor',
    num_seguro_social:'',
    matricula: '',
    cedula:'',
  }
  constructor(
    private fb: FormBuilder,
    private aut: AuthService,
    private frS: FirestoreService,
    private router: Router,
    private tc: ToastController
  ) {
    //DE A LEY HAY QUE PONER ESTA PARTE PARA QUE JALE LA VALIDANCION DEL IF
    this.aut.stateUser().subscribe(res=>{
      if(res){
        this.login=true;
        this.getDatosUser(res.uid);
      }
    })
  }

  ngOnInit() {
    this.form=this.fb.group({
      uid: this.frS.getId(),
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      correo: ['',Validators.required],
      password: ['',Validators.required],
      telefono: ['',Validators.required],
      perfil: ['Doctor',Validators.required],
      cedula: ['',Validators.required],
    });
  }
  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se ha añadido un nuevo Doctor',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }

  async faltan (position:'bottom'){
    const toast= await this.tc.create({
      message:'Favor de completar todos los campos antes de guardar',
      duration: 3000,
      icon: 'alert-circle-outline',
      position:position
    });
    await toast.present();
  }

  async registrar(){
    console.log('datos ->',this.form.value);
    const res=await this.aut.registrarUser(this.form.value).catch(erro=>{
      this.faltan("bottom");
      console.log('error');
    })
    if(res){
      console.log('Se ha añadido un nuevo Doctor');
      const path='Usuarios';
      const id=res.user?.uid;
      const data= this.form.value;
      data.uid=id;
      data.password='';
      await this.frS.createDoc(data,path,id!);
      this.correcto("bottom");
      this.router.navigate(['/principal'])
    }
  }

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
