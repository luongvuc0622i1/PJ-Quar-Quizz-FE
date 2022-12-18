import { Routes } from '@angular/router';

import {ListTestComponent} from "../../manager-pages/test/list-test/list-test.component";
import {CreateTestComponent} from "../../manager-pages/test/create-test/create-test.component";
import {ListQuizComponent} from "../../manager-pages/quiz/list-quiz/list-quiz.component";
import {CreateQuizComponent} from "../../manager-pages/quiz/create-quiz/create-quiz.component";
import {UpdateQuizComponent} from "../../manager-pages/quiz/update-quiz/update-quiz.component";
import {DetailTestComponent} from "../../manager-pages/test/detail-test/detail-test.component";
import {ListUserComponent} from "../../manager-pages/result/list-user/list-user.component";
import {ProfileComponent} from "../../manager-pages/profile/profile.component";
import {ListCategoryComponent} from "../../manager-pages/category/list-category/list-category.component";
import {CreateCategoryComponent} from "../../manager-pages/category/create-category/create-category.component";
import {ResultListComponent} from "../../user-pages/result/result-list/result-list.component";
import {ResultDetailComponent} from "../../user-pages/result/result-detail/result-detail.component";


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
    { path: 'users/:id',            component: ResultListComponent },
    { path: 'results/:id',          component: ResultDetailComponent },
];
