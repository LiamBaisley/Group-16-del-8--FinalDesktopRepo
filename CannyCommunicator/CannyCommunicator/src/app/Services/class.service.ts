import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassCrud } from 'src/app//Models/class-crud';// Import of Class

const URL = "https://localhost:44302/api"


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  getClassGrade(): any {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }
      //READ
    public async getClass(){
      let result =  await this.http.get<ClassCrud[]>(URL+'/Classes').toPromise();
       return result; 
      //  Classcrud[] is the class i.e you’re taking in Classes of type Class[] 
    }
      //GET ONE RECORD WITH ID 
      public async getClassID(id: any){

        let response = await this.http.get(URL+'/Classes/'+id).toPromise();
        console.log(response);
        return response;
      }
    
    //CREATE
  public async createClass(classCrud: ClassCrud){
    console.log(ClassCrud);
    let response = await this.http.post(URL+'/Classes', classCrud).toPromise();
    return response;
  }
//UPDATE
  public async updateClass(id: number, classCrud: ClassCrud){
    let reponse = await this.http.put(URL+'/Classes/'+id, classCrud).toPromise();
    return reponse;
  }
//DELETE
 public async deleteClass(id: number){
    let response = await this.http.delete(URL+'/Classes/'+id).toPromise();
    return response;
  }
}

