import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { AppComponent } from './app.component';
import {ManagerLayoutComponent} from "./layouts/manager-layout/manager-layout.component";
import {MatIconModule} from "@angular/material/icon";
import {Auth_interceptor} from "./service/auth_interceptor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {SidebarAdminModule} from "./layouts/admin-layout/sidebar/sidebar-admin.module";
import {SidebarManagerModule} from "./layouts/manager-layout/sidebar/sidebar-manager.module";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatPaginatorModule,
        SidebarManagerModule,
        SidebarAdminModule,
    ],
    declarations: [
        AppComponent,
        LandingPageComponent,
        AccountPageComponent,
        UserLayoutComponent,
        ManagerLayoutComponent,
        AdminLayoutComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Auth_interceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }