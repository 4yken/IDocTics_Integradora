// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'integradora-45bb8',
    appId: '1:916389035230:web:565e2ee87c5ffd4b88d64f',
    storageBucket: 'integradora-45bb8.appspot.com',
    apiKey: 'AIzaSyBwcjLTG__zWaZZeLlbA7z0SwdRwubj-6o',
    authDomain: 'integradora-45bb8.firebaseapp.com',
    messagingSenderId: '916389035230',
    measurementId: 'G-REV7RM0SD1',
  },
  production: false,

  //aqui se pegaron las credenciales del firebase las cuales las sacamos de "configuracion del proyecot
  // ahi solo escogimos el json y lo pegamos tanto aqui como en el prod tal cual quitando el signo = y el export
  firebaseConfig : {
    apiKey: "AIzaSyBwcjLTG__zWaZZeLlbA7z0SwdRwubj-6o",
    authDomain: "integradora-45bb8.firebaseapp.com",
    projectId: "integradora-45bb8",
    storageBucket: "integradora-45bb8.appspot.com",
    messagingSenderId: "916389035230",
    appId: "1:916389035230:web:565e2ee87c5ffd4b88d64f",
    measurementId: "G-REV7RM0SD1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
