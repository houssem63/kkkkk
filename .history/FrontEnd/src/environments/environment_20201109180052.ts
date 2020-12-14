// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DureeAbonnement } from "src/app/models/durreabonnement";

//import { DureeAbonnement } from "src/app/models/durreabonnement";

export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api',
    RECAPTCHA_SITE_Key: '6LfhP9sZAAAAAJ-n0RXlrZFOh2nRmbBawdMwe8V2',

};
export const ConfirmationDialog = {

    Confirmation:'Supprimer',
    Annuler:'Annuler',
    Title: 'Suppression d\'un élément',
    Message: 'Êtes-vous sûre de vouloir supprimer cet élément',
};
export const DureeAbonnementtab: DureeAbonnement [] = [
    { Libelle: '3 Mois', Valeur : 3  },
    { Libelle: '6 Mois', Valeur : 6  },
    { Libelle: '9 Mois', Valeur : 9 },
    { Libelle: '12 Mois', Valeur : 12 },
    { Libelle: '18 Mois', Valeur : 18 },
    { Libelle: '24 Mois', Valeur : 24 },
    { Libelle: '30 Mois', Valeur : 30 },
    { Libelle: '36 Mois', Valeur : 36 },
    { Libelle: '42 Mois', Valeur : 42 },


];

export const fraisMonsuelAbonnement = 20 * 1.19;
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
