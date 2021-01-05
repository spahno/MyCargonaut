import { Component, OnInit } from '@angular/core';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Gesuch} from '../../../models/Gesuch';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-gesuch',
  templateUrl: './gesuch.page.html',
  styleUrls: ['./gesuch.page.scss'],
})
export class GesuchPage implements OnInit {
  user: User = new User('', '', '', '');
  gesuche: Gesuch[] = [];
  filtertGesuche: Gesuch[] = [];
  constructor(private gesuchService: GesuchService,
              private authService: AuthService) {
    this.authService.loadPageSubscription(u => this.user = u);
    this.gesuchService.observableGesuch().subscribe(async data => {
      this.gesuche = [];
      this.filtertGesuche = [];
      this.gesuche = data;
      this.gesuche.forEach(e => {this.filtertGesuche.push(e); });
    });
  }

  ngOnInit() {
  }

}
