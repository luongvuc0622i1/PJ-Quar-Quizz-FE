import { Routes } from '@angular/router';

import {ExamListComponent} from "../../exam/exam-list/exam-list.component";
import {ExamDetailComponent} from "../../exam/exam-detail/exam-detail.component";
import {HistoryListComponent} from "../../history/history-list/history-list.component";
import {HistoryDetailComponent} from "../../history/history-detail/history-detail.component";
import {ExamQuizDetailComponent} from "../../examQuiz/exam-quiz-detail/exam-quiz-detail.component";

export const UserLayoutRoutes: Routes = [
  { path: 'home',      component: ExamListComponent },
  { path: 'exam/detail/:id',component: ExamDetailComponent },
  { path: 'histories',        component: HistoryListComponent},
  { path: 'histories/:id',    component: HistoryDetailComponent },
    {path:'examQuizDetail/:id', component:ExamQuizDetailComponent}

];
