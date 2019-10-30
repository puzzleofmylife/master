// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseAPIURL: "https://localhost:5001",
  baseAPIURL: "https://puzzle-api-staging.eu-gb.mybluemix.net",
 // baseAPIURL: "https://puzzle-api-production.eu-gb.mybluemix.net",
  applicationOutcomeDays: 7,
  emailAdmin: "admin@puzzleofmylife.com",
  checkoutFormSrc: "https://test.oppwa.com/v1/paymentWidgets.js",
  baseAppUrl: "http://localhost:4200" 
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
