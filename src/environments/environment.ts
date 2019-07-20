// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDDIfSH1wH4mBS1iCoWdDkXdoNdEO6T3MI',
    authDomain: 'challenge-verygin.firebaseapp.com',
    databaseURL: 'https://challenge-verygin.firebaseio.com',
    projectId: 'challenge-verygin',
    storageBucket: 'challenge-verygin.appspot.com',
    messagingSenderId: '279370363391',
  },
  API_URL: 'http://www.omdbapi.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
