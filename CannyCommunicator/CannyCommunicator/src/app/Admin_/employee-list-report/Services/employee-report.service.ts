import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class EmployeeReportService {

  constructor( private http: HttpClient ) { }

  public async getEmployees()
  {
    let response = await this.http.get(URL+'/Employees').toPromise();
    return response;
  }
}
