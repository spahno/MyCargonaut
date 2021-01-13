import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../services/auth/authGuard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'tracking',
        loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'gesuch',
        loadChildren: () => import('./pages/gesuch/gesuch.module').then(m => m.GesuchPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'angebot',
        loadChildren: () => import('./pages/angebot/angebot.module').then(m => m.AngebotPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'suchen',
        loadChildren: () => import('./pages/suchen/suchen.module').then(m => m.SuchenPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auftraege',
        loadChildren: () => import('./pages/auftraege/auftraege.module').then(m => m.AuftraegePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
