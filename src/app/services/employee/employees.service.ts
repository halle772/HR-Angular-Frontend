import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}
  
  baseUrl = environment.apiUrl;

  getEmployees() {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  addEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  updateEmployee(data: any, id: number) {
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

}
