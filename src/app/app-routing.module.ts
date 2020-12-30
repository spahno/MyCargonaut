import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'angebot',
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
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
