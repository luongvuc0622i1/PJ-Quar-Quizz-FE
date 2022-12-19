import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user";

const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

  findById(id: number) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  update(id: number, user: any): Observable<User> {
    return this.http.put<User>(`${API_URL}/changePassword/${id}`, user);
  }
}
