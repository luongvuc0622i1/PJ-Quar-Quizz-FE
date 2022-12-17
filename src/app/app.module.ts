import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import {ManagerLayoutComponent} from "./layouts/manager-layout/manager-layout.component";
import { FormLoginComponent } from './form-login/form-login.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {Auth_interceptor} from "./auth_interceptor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { HomePageComponent } from './home-page/home-page.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ListResultComponent } from './result/list-user/list-result.component';
import { UserResultComponent } from './result/user-result/user-result.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { DetailResultComponent } from './result/detail-result/detail-result.component';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatPaginatorModule
    ],
    declarations: [
        AppComponent,
        ManagerLayoutComponent,
        FormLoginComponent,
        HomePageComponent,
        UserLayoutComponent,
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