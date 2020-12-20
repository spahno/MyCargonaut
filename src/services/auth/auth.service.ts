import {Injectable} from '@angular/core';
import {Cargonaut} from '../../models/cargonaut';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    cargonaut: Cargonaut;
    subCargonaut: Subscription;
    cargonautCollection: AngularFirestoreCollection<Cargonaut>;

    constructor(private afs: AngularFirestore,
                private afAuth: AngularFireAuth,
                private router: Router,
                private loadingController: LoadingController) {
        this.cargonautCollection = afs.collection<Cargonaut>('cargonauts');
    }

    private static copyAndPrepare(user: Cargonaut): Cargonaut {
        const copy = {...user};
        delete copy.id;

        copy.mail = copy.mail || null;
        copy.username = copy.username || null;
        copy.profile_image = copy.profile_image || null;

        return copy;
    }

    persistCargonaut(cargonaut: Cargonaut, id: string) {
        this.cargonautCollection.doc(id).set(AuthService.copyAndPrepare(cargonaut));
    }

    async refresh() {
        const loading = await this.loadingController.create({
            message: 'Lädt...',
            duration: 10
        });
        await loading.present();


        await this.findCargonautById(localStorage.getItem('uid'))
            .subscribe(async c => {
                this.cargonaut = c;
                await this.router.navigate(['start']);
            });

        await loading.onDidDismiss();
    }

    findCargonautById(id): Observable<Cargonaut> {
        const changeAction = this.cargonautCollection.doc<Cargonaut>(id);
        return changeAction.snapshotChanges()
            .pipe(
                map(changes => {
                    const data = changes.payload.data();
                    if (data) {
                        data.id = id;
                    }
                    return {...data};
                }));
    }

    async updateCargonaut(cargonaut: Cargonaut) {
        await this.cargonautCollection.doc(cargonaut.id).update(AuthService.copyAndPrepare(cargonaut));
    }

    register(mail: string, username: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(mail, password)
            .then(async res => {
                this.persistCargonaut(new Cargonaut(mail, username, res.user.photoURL), res.user.uid);
                localStorage.setItem('uid', res.user.uid);
                this.subCargonaut = this.findCargonautById(res.user.uid)
                    .subscribe(async c => {
                        this.cargonaut = c;
                        await this.router.navigate(['/start']);
                    });
                await this.router.navigate(['/start']);
            })
            .catch((error) => {
                alert(error);
            });
    }

    async login(mail: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(mail, password)
            .then(res => {
                localStorage.setItem('uid', res.user.uid);
                this.subCargonaut = this.findCargonautById(res.user.uid)
                    .subscribe(async c => {
                        this.cargonaut = c;
                        await this.router.navigate(['/start']);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    }

    async logout() {
        if (this.subCargonaut) {
            this.subCargonaut.unsubscribe();
        }
        this.cargonaut = undefined;
        localStorage.clear();
        await this.afAuth.signOut();
    }
}
