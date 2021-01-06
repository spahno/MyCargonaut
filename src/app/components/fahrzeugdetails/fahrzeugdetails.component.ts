import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Fahrzeug} from '../../../models/fahrzeug';
import {FahrzeugService} from '../../../services/fahrzeug/fahrzeug.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-fahrzeugdetails',
  templateUrl: './fahrzeugdetails.component.html',
  styleUrls: ['./fahrzeugdetails.component.scss'],
})
export class FahrzeugdetailsComponent implements OnInit {

  /**
   * Values that are passed to the form
   */
  @Input() fahrzeug: Fahrzeug = new Fahrzeug();
  @Input() detailmode = true;
  @Input() editmode = false;

  errors: Map<string, string> = new Map<string, string>();

  constructor(public modalController: ModalController,
              public fahrzeugService: FahrzeugService,
              public authService: AuthService) { }

  ngOnInit() {
    // console.log(
        // 'fahrzeug: ' + this.fahrzeug.marke,
    //     'editmode: ' + this.editmode,
    //     'detailmode: ' + this.detailmode
    // );
  }

  /**
   * Checks all values and then either calls updateFahrzeug or addFahrzeug
   */
  save() {
    if (this.fahrzeug.nummernschild.trim().length === 0) {
      this.errors.set('nummernschild', 'Das Nummernschild muss korrekt eingetragen werden!');
    }
    if (this.fahrzeug.marke.trim().length === 0) {
      this.errors.set('marke', 'Die Marke muss korrekt eingetragen werden!');
    }
    if (this.fahrzeug.modell.trim().length === 0) {
      this.errors.set('modell', 'Das Modell muss korrekt eingetragen werden!');
    }
    if (this.fahrzeug.fahrzeugart.trim().length === 0) {
      this.errors.set('fahrzeugart', 'Die Fahrzeugart muss korrekt eingetragen werden!');
    }
    if (this.fahrzeug.farbe.trim().length === 0) {
      this.errors.set('farbe', 'Die Farbe muss korrekt eingetragen werden!');
    }
    if (!this.fahrzeug.baujahr) {
      this.errors.set('baujahr', 'Das Baujahr muss korrekt eingetragen werden!');
    }
    if (!this.fahrzeug.hoehe) {
      this.errors.set('hoehe', 'Die Höhe muss korrekt eingetragen werden!');
    }
    if (!this.fahrzeug.breite) {
      this.errors.set('breite', 'Die Breite muss korrekt eingetragen werden!');
    }
    if (!this.fahrzeug.tiefe) {
      this.errors.set('tiefe', 'Die Tiefe muss korrekt eingetragen werden!');
    }

    if (this.errors.size === 0) {

      if (this.editmode) {
        console.log('schreibt eine editFahrzeug ihr lappen');
        this.errors.clear();
        this.dismiss();
      } else {
        this.fahrzeugService.addFahrzeug(this.fahrzeug).then(res => {
          const user = this.authService.getUser();
          user.fahrzeuge.push(res.fahrzeug.id);
          this.authService.persist(user, user.id);
        });
        this.errors.clear();
        this.dismiss();
      }
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
