import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserLayoutRoutes} from './user-layout.routing';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {ResultListComponent} from "../../user-pages/result/result-list/result-list.component";
import {ResultDetailComponent} from "../../user-pages/result/result-detail/result-detail.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {PlayingPageComponent} from "../../user-pages/playing-page/playing-page.component";
import {UserHomeComponent} from "../../user-pages/user-home/user-home.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTableModule,
        MatExpansionModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
    ],
    declarations: [
        UserHomeComponent,
        PlayingPageComponent,
        ResultListComponent,
        ResultDetailComponent,
    ]
})

export class UserLayoutModule {
}
