import { Component, OnInit } from '@angular/core';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Gesuch} from '../../../models/Gesuch';

@Component({
  selector: 'app-gesuch',
  templateUrl: './gesuch.page.html',
  styleUrls: ['./gesuch.page.scss'],
})
export class GesuchPage implements OnInit {
  gesuche: Gesuch[] = [];
  filtertGesuche: Gesuch[] = [];
  constructor(private gesuchService: GesuchService) {
    this.gesuchService.observableGesuch().subscribe(async data => {
      this.gesuche = data;
      this.gesuche.forEach(e => {this.filtertGesuche.push(e); });
    });
  }

  ngOnInit() {
  }

}
