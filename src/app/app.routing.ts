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
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {AdminGuard} from "./service/security/admin.guard";
import {ManagerGuard} from "./service/security/manager.guard";
import {UserGuard} from "./service/security/user.guard";

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
        path: 'forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'user', canActivate: [UserGuard],
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
        path: 'manager', canActivate: [ManagerGuard],
        component: ManagerLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/manager-layout/manager-layout.module').then(x => x.ManagerLayoutModule)
            }]
    },
    {
        path: 'admin', canActivate: [AdminGuard],
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
