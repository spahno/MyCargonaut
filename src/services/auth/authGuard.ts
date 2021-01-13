import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.checkIfLoggedIn()
                .then(res => {
                    if (!res) {
                        localStorage.clear();
                        const location: string = window.location.pathname;
                        if (!(location === '/login' || location === '/registrierung')) {
                            this.router.navigate(['/login']);
                        }
                    }
                    resolve(res);
                });
        });
    }
}
