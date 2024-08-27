
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//ironicamente tuvimos que dar muchas vueltas para poder insertar una linea de codigo xd
//npm install @angular/fire firebase --save
import { AngularFireModule} from '@angular/fire/compat';
// para utenticar o logear se usa a este sujeto vvvvvvvv
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//controlar la bd vvv
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';

//hay un problema que causo este sujeto ^^^^^ porque hacia falta un "<T>" en un archivo de "interfaces.d.ts" en las lineas donde marcaba error xd


//---------------------FontAwesome--------------------//

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
    //aqui se esta generando el acceso atraves de las credenciales
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //talcual copiar pegar de arriba
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AngularFirestoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {

	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, fab, far);
	}

}
