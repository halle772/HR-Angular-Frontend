import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  signUp(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

}
