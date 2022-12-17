import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamQuiz} from "../../model/exam-quiz";
import {ExamTest} from "../../model/exam-test";

const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<ExamQuiz[]>{
    return this.http.get<ExamQuiz[]>(API_URL+'/user/examQuiz');
  }

  saveQuiz(examQuiz: ExamQuiz): Observable<ExamQuiz> {
    return this.http.post<ExamQuiz>(API_URL + `/user/examQuiz`, examQuiz);
  }

  findEQById(id: number) {
    return this.http.get<ExamQuiz>(`${API_URL}/user/examQuiz/${id}`);
  }

  delete(id: number): Observable<ExamQuiz> {
    return this.http.delete<ExamQuiz>(`${API_URL}/user/examQuiz/${id}`);
  }

  getAll2(): Observable<ExamTest[]>{
    return this.http.get<ExamTest[]>(API_URL+'/user/examTest');
  }

  getAll1():Observable<ExamTest[]>{
    return this.http.get<ExamTest[]>(API_URL+'/user/examHistory');
  }

  saveTest(examTest: ExamTest): Observable<ExamTest> {
    return this.http.post<ExamTest>(API_URL + `/user/examTest`, examTest);
  }
}
