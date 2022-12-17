import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ManagerLayoutComponent} from "./layouts/manager-layout/manager-layout.component";
import {FormLoginComponent} from "./form-login/form-login.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UserLayoutComponent} from "./layouts/user-layout/user-layout.component";
import {AuthGuard} from "./security/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }, {
        path: 'manager', canActivate: [AuthGuard],
        component: ManagerLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/manager-layout/manager-layout.module').then(x => x.ManagerLayoutModule)
            }]
    }, {
        path: 'user', canActivate: [AuthGuard],
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/user-layout/user-layout.module').then(x => x.UserLayoutModule)
            }]
    },
    {
        path: 'account',
        component: FormLoginComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./form-login/form-login.module').then(x => x.FormLoginModule)
            }]
    },
    {
        path: '**',
        component: HomePageComponent
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
