import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeQuizzes} from "../../model/typequizzes";
import {environment} from "../../../environments/environment";
import {Quiz} from "../../model/quiz";
import {Level} from "../../model/level";

const API_URL=`${environment.apiUrl}`

class Categories {
}

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(API_URL + '/manager/quizzes');
    }

    findById(id: number) {
        return this.http.get<Quiz>(`${API_URL}/manager/quizzes/${id}`);
    }

    save(quiz: Quiz): Observable<Quiz> {
        return this.http.post<Quiz>(API_URL + `/manager/quizzes`, quiz);
    }

    update(id: number, Quiz: Quiz): Observable<Quiz> {
        return this.http.put<Quiz>(`${API_URL}/manager/quizzes/${id}`, Quiz);
    }

    delete(id: number): Observable<Quiz> {
        return this.http.delete<Quiz>(`${API_URL}/manager/quizzes/${id}`);
    }

    getLevels(): Observable<Level[]> {
        return this.http.get<Level[]>(API_URL + '/manager/levels');
    }

    getTypeQuizzes(): Observable<TypeQuizzes[]> {
        return this.http.get<TypeQuizzes[]>(API_URL + '/manager/quizzes/type');
    }

    getCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(API_URL + '/manager/categories');
    }
}
