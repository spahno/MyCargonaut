import {Component, OnDestroy, OnInit} from '@angular/core';
import {Angebot} from '../../../models/Angebot';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-angebot',
  templateUrl: './angebot.page.html',
  styleUrls: ['./angebot.page.scss'],
})
export class AngebotPage implements OnInit, OnDestroy {
    user: User = new User('', '', '', '');
    angebote: Angebot[] = [];
    filtertAngebote: Angebot[] = [];
    subAngebot;

    constructor(private angebotService: AngebotService,
                private authService: AuthService) {

    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => this.user = u);
        this.angebotService.observableAngebote().subscribe(async data => {
            this.angebote = [];
            this.filtertAngebote = [];
            this.angebote = data;
            this.filterAngebote();
        });
    }

    ngOnDestroy(): void {
        this.subAngebot.unsubscribe();
    }

    filterAngebote() {
        this.filtertAngebote = [];
        const startort = this.angebotService.startort.toLowerCase();
        const zielort = this.angebotService.zielort.toLowerCase();
        const endDate = this.angebotService.endDate;
        if (startort && zielort && endDate) {
            for (const angebot of this.angebote) {
                const foundStart: boolean = angebot.abfahrtOrt.toLowerCase().includes(startort);
                const foundEnd: boolean = angebot.ankunftOrt.toLowerCase().includes(zielort);
                const foundDate: boolean = angebot.ankunftDatum === endDate;
                if (foundStart && foundDate && foundEnd) {
                    this.filtertAngebote.push(angebot);
                }
            }
        } else {
            this.filtertAngebote = this.angebote;
        }
    }
}
