import {Component, OnInit} from '@angular/core';
import {GesuchService} from '../../../services/gesuch/gesuch.service';
import {Gesuch} from '../../../models/Gesuch';
import {start} from 'repl';

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
            this.gesuche = [];
            this.filtertGesuche = [];
            this.gesuche = data;
            this.gesuche.forEach(e => {
                this.gesuche.push(e);
            });
            this.filterGesuche();
        });
    }

    ngOnInit() {
    }

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
        }
    }
}
