import {Component, Input, OnInit} from '@angular/core';
import {Anfrage} from '../../models/Anfrage';

@Component({
  selector: 'app-anfrage-card',
  templateUrl: './anfrage-card.component.html',
  styleUrls: ['./anfrage-card.component.scss'],
})
export class AnfrageCardComponent implements OnInit {
  @Input() anfrage: Anfrage;
  dopdown = false;

  constructor() { }

  ngOnInit() {}

}
