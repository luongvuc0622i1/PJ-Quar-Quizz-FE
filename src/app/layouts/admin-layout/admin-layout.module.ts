import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {AdminLayoutRoutes} from "./admin-layout.routing";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTableModule,
        MatExpansionModule,
        MatListModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatIconModule
    ],
    declarations: [
        // HomeComponent,
        // UserComponent
    ]
})

export class AdminLayoutModule {
}