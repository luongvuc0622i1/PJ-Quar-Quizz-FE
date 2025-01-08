import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ManagerLayoutComponent} from "./layouts/manager-layout/manager-layout.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {PlayingPageComponent} from "./user-pages/playing-page/playing-page.component";
import {AdminGuard} from "./service/security/admin.guard";
import {ManagerGuard} from "./service/security/manager.guard";
import {UserGuard} from "./service/security/user.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {AuthGuard} from "./service/security/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'account',
        component: AccountPageComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'user', canActivate: [UserGuard, AuthGuard],
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/user-layout/user-layout.module').then(x => x.UserLayoutModule)
            }]
    },
    {   path: 'user/playing/:id',
        component: PlayingPageComponent
    },
    {
        path: 'manager', canActivate: [ManagerGuard, AuthGuard],
        component: ManagerLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/manager-layout/manager-layout.module').then(x => x.ManagerLayoutModule)
            }]
    },
    {
        path: 'admin', canActivate: [AdminGuard, AuthGuard],
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
            }]
    },
    {
        path: '**',
        component: LandingPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
