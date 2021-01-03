import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ChangePageService {

    constructor(private router: Router,
                public loadingController: LoadingController) {
    }

    public async route(page: string) {
        const loading = await this.loadingController.create({
            message: 'Bitte warten...',
            duration: 1
        });

        this.router.navigate(['/' + page])
            .then(async () => {
                await loading.present();
                await loading.onDidDismiss();
            });
    }
}
