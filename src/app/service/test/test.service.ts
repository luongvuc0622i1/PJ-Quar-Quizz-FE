import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Test} from "../../model/test";
import {Level} from "../../model/level";
import {Quiz} from "../../model/quiz";
import {Category} from "../../model/category";

const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) {
  }

  getAll(): Observable<Test[]> {
    return this.http.get<Test[]>(API_URL + '/user/tests');
  }

  findById(id: number): Observable<Test> {
    return this.http.get<Test>(`${API_URL}/user/tests/${id}`);
  }

  save(test: Test): Observable<Test> {
    return this.http.post<Test>(API_URL + `/manager/tests`, test);
  }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(API_URL + '/manager/levels');
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(API_URL + '/manager/quizzes');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/manager/categories');
  }
}
