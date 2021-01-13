import { Component } from '@angular/core';
import {AngebotService} from '../../../services/angebot/angebot.service';
import {GesuchService} from '../../../services/gesuch/gesuch.service';

@Component({
  selector: 'app-suchen',
  templateUrl: './suchen.page.html',
  styleUrls: ['./suchen.page.scss'],
})
export class SuchenPage {

  tabSwitch = 'gesuche';

  startort = '';
  zielort = '';
  endDate = '';

  now = new Date().getFullYear();

  constructor(public angebotService: AngebotService,
              public gesuchService: GesuchService) { }

  /**
   * Triggers when the segment is clicked to change filter string
   * @param ev the event that is triggered by clicking the segment button
   */
  segmentChanged(ev: any) {
    console.log(this.tabSwitch);
  }

  /**
   * Prepares filter values and passes them to the service
   */
  gesuchSearch() {
    console.log(this.endDate);
    this.transformDate();
    console.log(this.endDate);
    this.gesuchService.startSearch(this.startort, this.zielort, this.endDate);
  }

  /**
   * Prepares filter values and passes them to the service
   */
  angebotSearch() {
    console.log(this.endDate);
    this.transformDate();
    console.log(this.endDate);
    this.angebotService.startSearch(this.startort, this.zielort, this.endDate);
  }

  /**
   * Transforms a given date ti german date format
   */
  transformDate() {
    this.endDate = new Date(this.endDate).toLocaleString('de-DE', {year: 'numeric', month: '2-digit', day: '2-digit'});
  }

}
