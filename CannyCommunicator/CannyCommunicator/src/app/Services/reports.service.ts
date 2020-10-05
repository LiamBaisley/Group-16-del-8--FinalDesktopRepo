import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from '../Models/child';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  api = 'https://localhost:44302/api/SReports'
  URL = environment.apiURL;
  constructor(private http:HttpClient) { }
//GetClassList
  public async getclasslist(ClassID,YearID){
    let result =  await this.http.get(this.api+'/GetClassList'+`?ClassID=${ClassID}&YearID=${YearID}`).toPromise();
    console.log(result);
    return result;
  }

  //GetEventList
  public async geteventlist(start,end){
    let result =  await this.http.get(this.api+'/GetClassList'+`?start=${start}&end=${end}`).toPromise();
    console.log(result);
    return result;
  }

  //GetCLasses
  public async getclasses(){
    let result =  await this.http.get(this.api+'/GetClasses').toPromise();
    console.log(result);
    return result;
  }

  //GetYears
  public async getyears(){
    let result =  await this.http.get(this.api+'/GetYears').toPromise();
    console.log(result);
    return result;
  }

  public async getTeacherClass(ID: number){
    let response = this.http.get(this.URL+"/GetTeacherClass/"+ID).toPromise();
    return response;
  }
}
