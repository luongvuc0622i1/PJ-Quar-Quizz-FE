import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {Test} from "../../model/test";

const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/manager/getUserRoles');
  }

  getAllUserManager(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/getUserManagerRoles');
  }

  lock(id: number) {
    return this.http.post(`${API_URL}/admin/lock/${id}`, id);
  }

  open(id: number) {
    return this.http.post(`${API_URL}/admin/open/${id}`, id);
  }
}
