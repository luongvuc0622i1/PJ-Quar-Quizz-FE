import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamTestDetail} from "../../history/interface/exam-test-detail";
import {environment} from "../../../environments/environment";
import {ExamQuiz} from "../interface/exam-quiz";
const API_URL=`${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ExamQuizService {

    constructor(private http : HttpClient) { }
    getAll(): Observable<ExamQuiz[]>{
        return this.http.get<ExamQuiz[]>(API_URL+'/user/examQuiz');
    }
    findById(id:number):Observable<ExamQuiz>{
        return this.http.get<ExamQuiz>(`${API_URL}/user/examQuiz/findExamQuizById/${id}`);
    }
}
