import { Component, OnInit } from '@angular/core';
import {Cargonaut} from "../../models/cargonaut";
import {Fahrzeug} from "../../models/fahrzeug";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: Cargonaut;
  car: Fahrzeug = {
    nummernschild: 'LDKRL777',
    marke: 'Audi',
    modell: 'A4',
    fahrzeugart: 'Limousine',
    farbe: 'silber',
    baujahr: 2020,
    ladeflaeche: [{hoehe: 75, breite: 180, tiefe: 180}]
  }
  cars = [];

  constructor() { }

  ngOnInit() {
    this.currentUser = {
      username: 'max power',
      vorname: 'max',
      nachname: 'mustermann',
      mail: 'maxpower@mail.com',
      bewertung: 0,
      fahrzeuge: [],
      angebote: [],
      gesuche: [],
      anfragen: []
    }
    this.cars.push(this.car);
  }

}
