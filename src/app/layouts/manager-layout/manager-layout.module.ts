import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManagerLayoutRoutes} from './manager-layout.routing';
import {ListTestComponent} from "../../manager-pages/test/list-test/list-test.component";
import {CreateTestComponent} from "../../manager-pages/test/create-test/create-test.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ListQuizComponent} from "../../manager-pages/quiz/list-quiz/list-quiz.component";
import {UpdateQuizComponent} from "../../manager-pages/quiz/update-quiz/update-quiz.component";
import {CreateQuizComponent} from "../../manager-pages/quiz/create-quiz/create-quiz.component";
import {MatTableModule} from "@angular/material/table";
import {DetailTestComponent} from "../../manager-pages/test/detail-test/detail-test.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ListUserComponent} from "../../manager-pages/result/list-user/list-user.component";
import {MatIconModule} from "@angular/material/icon";
import {ListResultComponent} from "../../manager-pages/result/list-result/list-result.component";
import {DetailResultComponent} from "../../manager-pages/result/detail-result/detail-result.component";
import {ProfileComponent} from "../../manager-pages/profile/profile.component";
import {ListCategoryComponent} from "../../manager-pages/category/list-category/list-category.component";
import {CreateCategoryComponent} from "../../manager-pages/category/create-category/create-category.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ManagerLayoutRoutes),
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
        ProfileComponent,
        ListCategoryComponent,
        CreateCategoryComponent,
        ListQuizComponent,
        UpdateQuizComponent,
        CreateQuizComponent,
        ListTestComponent,
        DetailTestComponent,
        CreateTestComponent,
        ListUserComponent,
        ListResultComponent,
        DetailResultComponent,
    ]
})

export class ManagerLayoutModule {
}
