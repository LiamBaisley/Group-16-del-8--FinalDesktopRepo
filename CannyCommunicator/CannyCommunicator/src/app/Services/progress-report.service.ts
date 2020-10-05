import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArrayType } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ProgressReportService {

  api = 'https://localhost:44302/api/ParentProgressReport';
  teachapi='https://localhost:44302/api/TeacherProgressReport'
  constructor(private http:HttpClient) { }

  //GET ONE RECORD WITH ID 
  public async getPRID(ChildID:number,YearID:number,TypeID:number){
    let response = await this.http.get(`${this.api}` +`/GetByID?ChildID=${ChildID}&YearID=${YearID}&TypeID=${TypeID}`).toPromise();
    console.log(response);
    return response;
  }

  //GET Years
  public async getYears(ChildID:number){
    let response = await this.http.get(`${this.api}` +`/GetYears?ChildID=${ChildID}`).toPromise();
    return response;
  }

  //GET Years
  public async getTypes(){
    let response = await this.http.get(`${this.api}` +`/GetTypes`).toPromise();
    return response;
  }

  //AcceptRecjet
  public async AcceptOrReject(ChildID: number,YearID: number,status:string, body?:any){
    let reposnse = await this.http.put(`${this.api}`+ `/Put?ChildID=${ChildID}&YearID=${YearID}&status=${status}`,body).toPromise();
   return reposnse; }

   //Teacher Stuff

   //Get Classes
   public async getClasses(){
    let response = await this.http.get(this.teachapi +'/GetClasses').toPromise();
    console.log(response);
    return response;
  }

  //Get Children in Class

  public async getChildrenInClass(ClassID:number){
    let response = await this.http.get(`${this.teachapi}` +`/GetClassList?ClassID=${ClassID}`).toPromise();
    return response;
  }

  //Get PRR Info 
   public async getReportCriteria(ClassID:number){
    let response = await this.http.get(`${this.teachapi}` +`/GetReportInfo?id=${ClassID}`).toPromise();
    console.log(response);
    return response;
}

//Capture Report
 public async CaptureReport(Marks:any,ChildID:any,ClassID:any,body?:any){
  let response = await this.http.post(`${this.teachapi}` +`/Post?ChildID=${ChildID}&ClassID=${ClassID}`,Marks).toPromise();
  console.log(response);
  return response;
}

//GetReport By ID
public async getCurrentReport(ChildID:any,TypeID:number){
  let response = await this.http.get(`${this.teachapi}` +`/GetByID?ChildID=${ChildID}&TypeID=${TypeID}`).toPromise();
  console.log(response);
  return response;
}

//Update
public async UpdateReport(Marks:any,ChildID:any,ClassID:any,TypeID:number){
  let response = await this.http.put(`${this.teachapi}` +`/Put?ChildID=${ChildID}&ClassID=${TypeID}&TypeID=${TypeID}`,Marks).toPromise();
  console.log(response);
  return response;
}

//Get Children
public async getChildren(){
  let response = await this.http.get(this.api + '/GetChildren').toPromise();
  console.log(response);
  return response;
}
}
