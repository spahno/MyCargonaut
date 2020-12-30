import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
