import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ManagerLayoutComponent} from "./layouts/manager-layout/manager-layout.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {AuthGuard} from "./service/security/auth.guard";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";

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
        path: 'user', canActivate: [AuthGuard],
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/user-layout/user-layout.module').then(x => x.UserLayoutModule)
            }]
    },
    {
        path: 'manager', canActivate: [AuthGuard],
        component: ManagerLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/manager-layout/manager-layout.module').then(x => x.ManagerLayoutModule)
            }]
    },
    {
        path: 'admin', canActivate: [AuthGuard],
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
