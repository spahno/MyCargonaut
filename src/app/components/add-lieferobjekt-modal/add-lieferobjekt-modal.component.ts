import {Component, Input, OnInit} from '@angular/core';
import {Lieferobjekt} from '../../../models/Lieferobjekt';
import {AlertController, ModalController} from '@ionic/angular';
import {LieferobjektService} from '../../../services/lieferobjekt/lieferobjekt.service';

@Component({
  selector: 'app-add-lieferobjekt-modal',
  templateUrl: './add-lieferobjekt-modal.component.html',
  styleUrls: ['./add-lieferobjekt-modal.component.scss'],
})
export class AddLieferobjektModalComponent implements OnInit {
  lieferobjekt = new Lieferobjekt();
  constructor(public modalController: ModalController,
              private lieferobjektService: LieferobjektService,
              public alertController: AlertController) { }

  ngOnInit() {}

  /**
   * method to dismiss the modal
   */
  closeModal() {
    this.lieferobjektService.addLieferobjekt(this.lieferobjekt)
        .then(res => {
          this.modalController.dismiss({
            objektId: res.lieferobjekt._ID
          });
        }).catch(async err => {
      const alert = await this.alertController.create({
        header: 'Fehler!',
        message: 'Fehler beim speichern des Lieferobjekts. Error: ' + err,
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
