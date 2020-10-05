import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassGradeCrud } from '../Models/class-grade-crud';// Import of Class

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class ClassGradeService {

  constructor(private http: HttpClient) { }
      //READ
    public async getClassGrade(){
      let result =  await this.http.get<ClassGradeCrud[]>(URL+'/ClassGrades').toPromise();
       return result; 
     
    }
      //GET ONE RECORD WITH ID 
      public async getClassGradeID(id: number){
        let response = await this.http.get(URL+'/ClassGrades/'+id).toPromise();
        return response;
      }
    
    //CREATE
  public async createClassGrade(classGradeCrud: ClassGradeCrud){
    console.log(classGradeCrud);
    let response = await this.http.post(URL+'/ClassGrades', classGradeCrud).toPromise();
    return response;
  }
//UPDATE
  public async updateClassGrade(id: number, classGradeCrud: ClassGradeCrud){
    let reponse = await this.http.put(URL+'/ClassGrades/'+id, classGradeCrud).toPromise();
    console.log(URL+'/ClassGrades/'+id, classGradeCrud);
    return reponse;
  }
//DELETE
 public async deleteClassGrade(id: number){
    let response = await this.http.delete(URL+'/ClassGrades/'+id).toPromise();
    return response;
  }
}

