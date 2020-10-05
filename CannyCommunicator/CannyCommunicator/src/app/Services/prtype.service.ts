import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRTypeCrud } from '../Models/prtype-crud';// Import of Class

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class PRTypeService {

  constructor(private http: HttpClient) { }
      //READ
    public async getPRType(){
      let result =  await this.http.get<PRTypeCrud[]>(URL+'/ProgressReportTypes').toPromise();
       return result; 
     
    }
      //GET ONE RECORD WITH ID 
      public async getPRTypeID(id: number){
        let response = await this.http.get(URL+'/ProgressReportTypes/'+id).toPromise();
        return response;
      }
    
    //CREATE
  public async createPRType(prTypeCrud: PRTypeCrud){
    console.log(prTypeCrud);
    let response = await this.http.post(URL+'/ProgressReportTypes', prTypeCrud).toPromise();
    return response;
  }
//UPDATE
  public async updatePRType(id: number, prTypeCrud: PRTypeCrud){
    let reponse = await this.http.put(URL+'/ProgressReportTypes/'+id, prTypeCrud).toPromise();
    console.log(URL+'/ProgressReportTypes/'+id, prTypeCrud);
    return reponse;
  }
//DELETE
 public async deletePRType(id: number){
    let response = await this.http.delete(URL+'/ProgressReportTypes/'+id).toPromise();
    return response;
  }
}

