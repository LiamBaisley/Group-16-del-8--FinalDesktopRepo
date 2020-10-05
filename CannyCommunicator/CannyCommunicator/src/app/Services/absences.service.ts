import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AbsencesService {
  api = 'https://localhost:44302/api/Absences';
  constructor(private http:HttpClient) { }
  //Get Classes
  public async getClasses(){
    let response = await this.http.get(this.api +'/GetClasses').toPromise();
    console.log(response);
    return response;
  }

  //Get Reasons
  public async getReasons(){
    let response = await this.http.get(this.api +'/GetReasonss').toPromise();
    console.log(response);
    return response;
  }


  //Get Children in Class
  
  public async getChildren(ClassID:number){
    let response = await this.http.get(`${this.api}` +`/GetClassList?ClassID=${ClassID}`).toPromise();
    return response;
  }
  // Mark Absent
  public async MarkAbsent(CCYID:number,reason:string,body?:any){
    let response = await this.http.post(`${this.api}` +`/Post?CCYID=${CCYID}&reason=${reason}`,body).toPromise();
    return response;
  }

  //Get Absent Children in Class
  //GET Years
  public async getAbsentChildren(ClassID:number){
    let response = await this.http.get(`${this.api}` +`/GetAbsentClassList?ClassID=${ClassID}`).toPromise();
    return response;
  }

  //Mark Presnet
  public async MarkPresent(id:number){
    let response = await this.http.delete(`${this.api}` +`/Delete?id=${id}`).toPromise();
    return response;
  }

  //Update Absnece
  public async UpdateAbsnece(AbsentID :number,reason:string,body?:any){
    let response = await this.http.put(`${this.api}` +`/Put?AbsentID=${AbsentID}&reason=${reason}`,body).toPromise();
    return response;
  }
  //GetByID
  public async GetByID(id:number){
    let response = await this.http.get(`${this.api}` +`/Get?id=${id}`).toPromise();
    return response;
  }


}

