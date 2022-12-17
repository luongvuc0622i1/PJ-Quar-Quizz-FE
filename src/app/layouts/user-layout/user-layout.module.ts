import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LbdModule} from '../../lbd/lbd.module';
import {NguiMapModule} from '@ngui/map';

import {UserLayoutRoutes} from './user-layout.routing';

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {ExamListComponent} from "../../exam/exam-list/exam-list.component";
import {ExamDetailComponent} from "../../exam/exam-detail/exam-detail.component";
import {HistoryListComponent} from "../../history/history-list/history-list.component";
import {HistoryDetailComponent} from "../../history/history-detail/history-detail.component";
import {ExamQuizDetailComponent} from "../../examQuiz/exam-quiz-detail/exam-quiz-detail.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        LbdModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTableModule,
        MatExpansionModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
    ],
    declarations: [
        ExamListComponent,
        ExamDetailComponent,
        HistoryDetailComponent,
        HistoryListComponent,
        ExamQuizDetailComponent

    ]
})

export class UserLayoutModule {
}
