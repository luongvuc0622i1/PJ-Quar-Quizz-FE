import { Routes } from '@angular/router';

import {HomeComponent} from "../../home/home.component";
import {TablesComponent} from "../../tables/tables.component";
import {TypographyComponent} from "../../typography/typography.component";
import {IconsComponent} from "../../icons/icons.component";
import {MapsComponent} from "../../maps/maps.component";
import {NotificationsComponent} from "../../notifications/notifications.component";
import {UserComponent} from "../../user/user.component";
import {ExamListComponent} from "../../exam/exam-list/exam-list.component";
import {ExamDetailComponent} from "../../exam/exam-detail/exam-detail.component";
import {HistoryListComponent} from "../../history/history-list/history-list.component";
import {HistoryDetailComponent} from "../../history/history-detail/history-detail.component";
import {ExamQuizDetailComponent} from "../../examQuiz/exam-quiz-detail/exam-quiz-detail.component";

export const UserLayoutRoutes: Routes = [
  { path: 'dashboard',      component: HomeComponent },
  { path: 'user',           component: UserComponent },
  { path: 'exam/list',      component: ExamListComponent },
  { path: 'exam/detail/:id',component: ExamDetailComponent },
  { path: 'table',          component: TablesComponent },
  { path: 'typography',     component: TypographyComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'maps',           component: MapsComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'histories',        component: HistoryListComponent},
  { path: 'histories/:id',    component: HistoryDetailComponent },
    {path:'examQuizDetail/:id', component:ExamQuizDetailComponent}

];
