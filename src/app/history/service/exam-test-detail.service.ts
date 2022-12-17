import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamTestDetail} from "../interface/exam-test-detail";
import {environment} from "../../../environments/environment";
const API_URL=`${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ExamTestDetailService {

    constructor(private http : HttpClient) { }
    getAll(): Observable<ExamTestDetail[]>{
        return this.http.get<ExamTestDetail[]>(API_URL+'/user/examTest');
    }
    getAll1():Observable<ExamTestDetail[]>{
        return this.http.get<ExamTestDetail[]>(API_URL+'/user/examHistory');
    }
    findById(id:number):Observable<ExamTestDetail>{
        return this.http.get<ExamTestDetail>(`${API_URL}/user/examTest/${id}`);
    }
}
