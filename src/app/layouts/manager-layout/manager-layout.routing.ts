import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {ListTestComponent} from "../../tests/crud/list-test/list-test.component";
import {CreateTestComponent} from "../../tests/crud/create-test/create-test.component";
import {ListComponent} from "../../category/list/list.component";
import {CreateComponent} from "../../category/create/create.component";
import {DeleteComponent} from "../../category/delete/delete.component";
import {ListQuizComponent} from "../../quiz/crud/list-quiz/list-quiz.component";
import {CreateQuizComponent} from "../../quiz/crud/create-quiz/create-quiz.component";
import {UpdateQuizComponent} from "../../quiz/crud/update-quiz/update-quiz.component";
import {DetailTestComponent} from "../../tests/crud/detail-test/detail-test.component";
import {ListResultComponent} from "../../result/list-user/list-result.component";
import {UserResultComponent} from "../../result/user-result/user-result.component";
import {DetailResultComponent} from "../../result/detail-result/detail-result.component";


export const ManagerLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'category',       component: ListComponent},
    { path: 'category/create',component: CreateComponent},
    { path: 'categories/:id',     component: DeleteComponent},
    { path: 'quiz/list',      component: ListQuizComponent },
    { path: 'quiz/create',    component: CreateQuizComponent },
    { path: 'quiz/update/:id',    component: UpdateQuizComponent },
    { path: 'test/list',      component: ListTestComponent },
    { path: 'test/create',    component: CreateTestComponent },
    { path: 'test/detail/:id',component: DetailTestComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'result',  component: ListResultComponent },
    { path: 'user-result/:id',  component: UserResultComponent },
    { path: 'detail-result/:id',  component: DetailResultComponent },

];
