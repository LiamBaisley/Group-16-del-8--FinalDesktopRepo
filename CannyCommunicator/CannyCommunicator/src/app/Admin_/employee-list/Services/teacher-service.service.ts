import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teachers } from '../Models/teachers.model'

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  constructor(private http  :HttpClient) { }

  public async getteacher(){
    let response = await this.http.get(URL+'/Teachers').toPromise();
    return response;
  }

  public async createTeacher(teachers: Teachers  ){
    let response = await this.http.post(URL+'/Teachers', teachers).toPromise();
    return response;
  }

  public async removeTeacher(id : number)
  {
    let response = await this.http.delete(URL+'/Teachers/'+id).toPromise();
    return response;
  }

  public async updateTeacher(id: number, teacher: Teachers){
    let reposnse = await this.http.put(URL+'/Teachers/'+id, teacher).toPromise();
    return reposnse;
  }

  
  public async getClass(){
    let response = await this.http.get(URL+'/Classes').toPromise();
    return response;
  }
}
