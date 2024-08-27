import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private atS: AuthService,
    private frS: FirestoreService,
    private tc: ToastController,
    private router: Router
  ) { }

  ngOnInit() {}

  async correcto(position:'bottom'){
    const toast= await this.tc.create({
      message:'Se ha cerrado sesion con exito',
      duration: 2500,
      icon: 'rocket',
      position:position
    });
    await toast.present();
  }
}
