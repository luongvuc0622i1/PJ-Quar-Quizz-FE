import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamQuiz} from "../../model/exam-quiz";
import {ExamTest} from "../../model/exam-test";
import {Quiz} from "../../quiz/model/quiz";
import {User} from "../../model/user";

const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  saveQuiz(examQuiz: ExamQuiz): Observable<ExamQuiz> {
    return this.http.post<ExamQuiz>(API_URL + `/user/examQuiz/create`, examQuiz);
  }

  saveTest(examTest: ExamTest): Observable<ExamQuiz> {
    return this.http.post<ExamQuiz>(API_URL + `/user/examTest/create`, examTest);
  }

  findEQById(id: number) {
    return this.http.get<ExamQuiz>(`${API_URL}/user/examQuiz/findExamQuizById/${id}`);
  }

  delete(id: number): Observable<ExamQuiz> {
    return this.http.delete<ExamQuiz>(`${API_URL}/user/examQuiz/deleteById/${id}`);
  }
}
