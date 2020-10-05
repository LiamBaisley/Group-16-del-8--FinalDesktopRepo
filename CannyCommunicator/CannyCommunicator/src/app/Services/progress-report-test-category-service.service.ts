import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressReportTestCategory } from '../Models/progress-report-test-category';
import { environment } from 'src/environments/environment';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class ProgressReportTestCategoryServiceService {


  constructor(private http: HttpClient) { }
   //READ

   public async getCategories(){
    let response = await this.http.get(URL+'/Categories').toPromise();
    return response;
  }

//GET ONE RECORD WITH ID 
public async getCategoryID(id: number){
  let response = await this.http.get(URL+'/Categories/'+id).toPromise();
  return response;
}
   public async createCategory(categoryinfo: ProgressReportTestCategory){
    let response = await this.http.post(URL+'/Categories', categoryinfo).toPromise();
    return response;
  }

 

  public async updateCategory(id: number, category: ProgressReportTestCategory){
    let reposnse = await this.http.put(URL+'/Categories/'+id, category).toPromise();
    return reposnse;
  }

  //DELETE
 public async deleteCategory(id: number){
  let response = await this.http.delete(URL+'/Categories/'+id).toPromise();
  return response;
}
//Get Class grades
public async getclassgrades(){
  let response = await this.http.get(URL+'/ClassGrades').toPromise();
  return response;
}
  }

