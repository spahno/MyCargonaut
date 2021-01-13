import {Component, OnDestroy, OnInit} from '@angular/core';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Gesuch} from '../../../models/Gesuch';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-gesuch',
    templateUrl: './gesuch.page.html',
    styleUrls: ['./gesuch.page.scss'],
})
export class GesuchPage implements OnInit, OnDestroy {
    user: User = new User('', '', '', '');
    gesuche: Gesuch[] = [];
    filtertGesuche: Gesuch[] = [];
    subGesuch;

    constructor(private gesuchService: GesuchService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loadPageSubscription(u => this.user = u);
        this.subGesuch = this.gesuchService.observableGesuch().subscribe(async data => {
            this.gesuche = [];
            this.filtertGesuche = [];
            this.gesuche = data;
            this.filterGesuche();
        });
    }
    /**
     * Make sure data is not loaded twice
     */
    ngOnDestroy(): void {
        this.subGesuch.unsubscribe();
    }
    /**
     * filters shown Gesuche by user input
     */
    filterGesuche() {
        const startort = this.gesuchService.startort.toLowerCase();
        const zielort = this.gesuchService.zielort.toLowerCase();
        const endDate = this.gesuchService.endDate;
        if (startort && zielort && endDate) {
            for (const gesuch of this.gesuche) {
                const foundStart: boolean = gesuch.abfahrtOrt.toLowerCase().includes(startort);
                const foundEnd: boolean = gesuch.ankunftOrt.toLowerCase().includes(zielort);
                const foundDate: boolean = gesuch.ankunftDatum === endDate;
                if (foundStart && foundDate && foundEnd) {
                    this.filtertGesuche.push(gesuch);
                }
            }
        } else {
            this.filtertGesuche = this.gesuche;
        }
    }
}
