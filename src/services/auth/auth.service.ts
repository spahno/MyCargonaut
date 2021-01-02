import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {ChangePageService} from '../changePage/change-page.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: User;
    subUser: Subscription;
    userCollection: AngularFirestoreCollection<User>;
    loggedIn = false;

    constructor(private changePage: ChangePageService,
                private afs: AngularFirestore,
                private afAuth: AngularFireAuth) {
        this.userCollection = this.afs.collection<User>('users');
    }

    /**
     * copy and prepare
     * @param user the user to be edited
     */
    private static copyAndPrepare(user: User): User {
        const copy = {...user};
        delete copy.id;

        copy.email = copy.email || null;
        copy.username = copy.username || null;

        return copy;
    }

    /**
     * persists the user's data in firestore
     */
    persist(user: User, id: string) {
        this.userCollection.doc(id).set(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to find a user by id
     * @param id id of a user
     * @return Observable<User> user that was found
     */
    findById(id): Observable<User> {
        const changeAction = this.userCollection.doc<User>(id);
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

    /**
     * Method to update the user's data in firestore
     * @param user user to be updated
     */
    async updateUser(user: User) {
        await this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to return the authenticated user
     * @return user current user
     */
    getUser(): User {
        return this.user;
    }

    checkIfLoggedIn(): Promise<boolean> {
        return new Promise((resolve) => {
            this.loadPageSubscription((u) => {
                if (u === undefined || u.id === undefined) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Method to sign up an user
     * @param email user's email
     * @param username user's username
     * @param password user's password
     */
    async signUp(email: string, username: string, password: string) {
        await this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(async res => {
                this.persist(new User(email, username), res.user.uid);
                this.subUser = this.findById(res.user.uid)
                    .subscribe(u => {
                        this.user = u;
                        this.loggedIn = true;
                    });
                localStorage.setItem('userID', res.user.uid);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Method to sign in an user
     * @param email user's email
     * @param password user's password
     */
    async signIn(email: string, password: string) {
        await this.afAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                localStorage.setItem('userID', res.user.uid);
                this.subUser = this.findById(res.user.uid)
                    .subscribe(async u => {
                        this.user = u;
                        this.loggedIn = true;
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * un-authenticate
     */
    logOut() {
        setTimeout(() => {
            this.loggedIn = false;
        }, 800);
        localStorage.clear();
        this.afAuth.signOut().then(() => {
            this.subUser.unsubscribe();
            this.changePage.route('login');
        });
    }

    /* async load(callback: (u: User) => void) {
         if (this.loggedIn) {
             this.subUser = await this.findById(localStorage.getItem('userID'))
                 .subscribe(u => {
                     this.user = u;
                     callback(this.user);
                 });
         }
     }*/

    async loadPageSubscription(callback: (u: User) => void) {
        let counter = true;
        if (this.getUserID()) {
            this.subUser = this.findById(this.getUserID())
                .subscribe(async u => {
                    this.user = await u;
                    this.loggedIn = true;
                    if (counter) {
                        counter = false;
                        callback(this.user);
                        setTimeout(() => counter = true, 500);
                    }
                });
        } else {
            callback(undefined);
        }
    }

    getUserID(): string {
        if (localStorage.getItem('userID')) {
            return localStorage.getItem('userID');
        } else {
            return undefined;
        }
    }

}
