import { Component, OnInit } from '@angular/core';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-angebot',
  templateUrl: './angebot.page.html',
  styleUrls: ['./angebot.page.scss'],
})
export class AngebotPage implements OnInit {
  user: User = new User('', '', '', '');
  angebote: Angebot[] = [];
  filtertAngebote: Angebot[] = [];
  constructor(private angebotService: AngebotService,
              private authService: AuthService) {
    this.authService.loadPageSubscription(u => this.user = u);
    this.angebotService.observableAngebote().subscribe(async data => {
      this.angebote = [];
      this.filtertAngebote = [];
      this.angebote = data;
      this.angebote.forEach(e => {this.filtertAngebote.push(e); });
    });
  }

  ngOnInit() {
  }

}
