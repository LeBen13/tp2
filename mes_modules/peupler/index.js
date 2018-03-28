"use strict";
const nbEnreg = 10;
const tableaux = require('./Tableau.js');

const peupler_json = () => {

	let aoNouvPers = [];
	let position, chiffre;
	for(let i = 0; i < nbEnreg; i++) {
		aoNouvPers[i] = {};

		position = Math.floor(Math.random()*tableaux.prenom.length);
		aoNouvPers[i]['prenom'] = tableaux.prenom[position];


		position = Math.floor(Math.random()*tableaux.nom.length);
		aoNouvPers[i]['nom'] = tableaux.nom[position];

		position = Math.floor(Math.random()*tableaux.courriel.length);
		aoNouvPers[i]['courriel'] = aoNouvPers[i]['prenom'] + '.' + aoNouvPers[i]['nom'] + '@' + tableaux.courriel[position];


		let tel = "";
		for(let iCompteur = 0; iCompteur<10; iCompteur++) {

			chiffre = Math.floor(Math.random()*10);
			tel += chiffre;
		}

		aoNouvPers[i]['telephone'] = tel;

	}

	return aoNouvPers;
}

module.exports = peupler_json;