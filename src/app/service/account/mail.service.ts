import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {any} from "codelyzer/util/function";
const API_URL=`${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/mail/sendOtp?email=` + email, email);
  }

  confirmPassword(otp: any, email: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/mail/confirmOtp?otp=${otp}&email=${email}`, any);
  }

}
