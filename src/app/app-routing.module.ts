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
        loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule)
    },
  {
    path: 'gesuch',
    loadChildren: () => import('./pages/gesuch/gesuch.module').then( m => m.GesuchPageModule)
  },
  {
    path: 'angebot',
    loadChildren: () => import('./pages/angebot/angebot.module').then( m => m.AngebotPageModule)
  },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
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
