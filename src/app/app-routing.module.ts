import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/authGuard';

const routes: Routes = [
    {path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingPageModule)},
    {path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)},
    {path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)},
    // protected by authentication guard
    {path: 'start', canActivate: [AuthGuard], loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
