import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {
   api = 'https://localhost:44302/api/Applications';
  api2 = 'https://localhost:44302/api/Application';
  constructor(private http:HttpClient) { }

  //Read
  public async getapplications(){
    console.log("hit");
    let result =  await this.http.get(this.api+'/GetNewApplications').toPromise();
    return result;  
  }

  public async getWaitingList(){
    let result =  await this.http.get(this.api+'/GetWaitingListApplications').toPromise();
    return result;  
  }

  public async getApplicationID(id: number){
    let response = await this.http.get(`${this.api2}`+`/Get/?id=${id}`).toPromise();
    return response;
  }

  public async getClasses(){
    let response = await this.http.get(this.api2+'/GetClasses').toPromise();
    return response;
  }

  //Accept/Reject
  public async AcceptOrReject(id: number,status:string, body?:any){
   let reposnse = await this.http.put(`${this.api2}`+ `/Put?id=${id}&status=${status}`,body).toPromise();
  return reposnse; }

  //AssigntoClass
  public async Assign(ChildID:number,ClassID:number,body?:any){
    let reposnse = await this.http.post(`${this.api2}`+ `/NewClassUser?ChildID=${ChildID}&ClassID=${ClassID}`,body).toPromise();
   return reposnse; }

   //Get Grades
   public async getGrades(){
    let response = await this.http.get(this.api+'/GetGrades').toPromise();
    return response;
  }
   }
 

 


