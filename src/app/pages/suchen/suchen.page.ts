import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suchen',
  templateUrl: './suchen.page.html',
  styleUrls: ['./suchen.page.scss'],
})
export class SuchenPage implements OnInit {

  tabSwitch = 'gesuche';
  startort = '';
  zielort = '';
  abfahrtsDat = '';
  abfahrtsZeit = '';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Triggers when the segment is clicked to change filter string
   * @param ev the event that is triggered by clicking the segment button
   */
  segmentChanged(ev: any) {
    console.log(this.tabSwitch);
  }

}
