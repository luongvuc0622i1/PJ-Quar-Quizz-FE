import { Routes } from '@angular/router';

import {ListTestComponent} from "../../manager-pages/test/list-test/list-test.component";
import {CreateTestComponent} from "../../manager-pages/test/create-test/create-test.component";
import {ListQuizComponent} from "../../manager-pages/quiz/list-quiz/list-quiz.component";
import {CreateQuizComponent} from "../../manager-pages/quiz/create-quiz/create-quiz.component";
import {UpdateQuizComponent} from "../../manager-pages/quiz/update-quiz/update-quiz.component";
import {DetailTestComponent} from "../../manager-pages/test/detail-test/detail-test.component";
import {ListUserComponent} from "../../manager-pages/result/list-user/list-user.component";
import {ListResultComponent} from "../../manager-pages/result/list-result/list-result.component";
import {DetailResultComponent} from "../../manager-pages/result/detail-result/detail-result.component";
import {ProfileComponent} from "../../manager-pages/profile/profile.component";
import {ListCategoryComponent} from "../../manager-pages/category/list-category/list-category.component";
import {CreateCategoryComponent} from "../../manager-pages/category/create-category/create-category.component";


export const ManagerLayoutRoutes: Routes = [
    { path: 'profile',              component: ProfileComponent },
    { path: 'categories',           component: ListCategoryComponent },
    { path: 'categories/create',    component: CreateCategoryComponent },
    { path: 'quizzes',              component: ListQuizComponent },
    { path: 'quizzes/create',       component: CreateQuizComponent },
    { path: 'quizzes/:id',          component: UpdateQuizComponent },
    { path: 'tests',                component: ListTestComponent },
    { path: 'tests/create',         component: CreateTestComponent },
    { path: 'tests/:id',            component: DetailTestComponent },
    { path: 'users',                component: ListUserComponent },
    { path: 'users/:id',            component: ListResultComponent },
    { path: 'users/:id/results/:id',component: DetailResultComponent },
];
