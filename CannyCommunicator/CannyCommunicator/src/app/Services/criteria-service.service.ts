import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CriteriaModel } from '../Models/criteria-model';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class CriteriaServiceService {

  constructor(private http : HttpClient) { }

  public async getCriteria(){
    let response = await this.http.get(URL+'/AssessmentCriteria').toPromise();
    return response;
  }

  public async getClassGrade(){
    let response = await this.http.get(URL+'/ClassGrades').toPromise();
    return response;
  }

  //GET ONE RECORD WITH ID 
public async getCriteriaID(id: number){
  let response = await this.http.get(URL+'/AssessmentCriteria/'+id).toPromise();
  return response;
}

   public async createCriteria(criteriainfo: CriteriaModel){
    let response = await this.http.post(URL+'/AssessmentCriteria', criteriainfo).toPromise();
    return response;
  }

 

  public async updateCriteria(id: number, criteria: CriteriaModel){
    debugger;
    let reposnse = await this.http.put(URL+'/AssessmentCriteria/'+id, criteria).toPromise();
    return reposnse;
  }

  //DELETE
 public async deleteCriteria(id: number){
  let response = await this.http.delete(URL+'/AssessmentCriteria/'+id).toPromise();
  return response;
}
}
