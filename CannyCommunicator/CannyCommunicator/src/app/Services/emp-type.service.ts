import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpTypeCrud } from '../Models/emp-type-crud';// Import of Class

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class EmpTypeService {

  constructor(private http: HttpClient) { }
      //READ
    public async getEmpType(){
      let result =  await this.http.get<EmpTypeCrud[]>(URL+'/EmployeeTypes').toPromise();
       return result; 
      //  Emptypecrud[] is the class i.e you’re taking in Employees of type Employee[] 
    }
      //GET ONE RECORD WITH ID 
      public async getEmpTypeID(id: number){
        let response = await this.http.get(URL+'/EmployeeTypes/'+id).toPromise();
        return response;
      }
    
    //CREATE
  public async createEmpType(empTypeCrud: EmpTypeCrud){
    console.log(empTypeCrud);
    let response = await this.http.post(URL+'/EmployeeTypes', empTypeCrud).toPromise();
    return response;
  }
//UPDATE
  public async updateEmpType(id: number, empTypeCrud: EmpTypeCrud){
    let reponse = await this.http.put(URL+'/EmployeeTypes/'+id, empTypeCrud).toPromise();
    console.log(URL+'/EmployeeTypes/'+id, empTypeCrud);
    return reponse;
  }
//DELETE
 public async deleteEmpType(id: number){
    let response = await this.http.delete(URL+'/EmployeeTypes/'+id).toPromise();
    return response;
  }
}

