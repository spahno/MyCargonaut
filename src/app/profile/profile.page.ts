import { Component, OnInit } from '@angular/core';
import {Cargonaut} from "../../models/cargonaut";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: Cargonaut;
  cars = [];

  constructor() { }

  ngOnInit() {
    this.currentUser = new Cargonaut('max.mustermann@mail.de', 'Maximilian Mustermann', null);
  }

}
