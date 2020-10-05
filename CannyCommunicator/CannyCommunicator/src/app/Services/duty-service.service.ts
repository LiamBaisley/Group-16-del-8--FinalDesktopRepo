import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Duty } from '../Models/duty';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


const URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class DutyServiceService {

  constructor(private http: HttpClient , private router : Router) { }
  //READ
  public async getDuties() {
    let response = await this.http.get(URL+ '/api/Duties').toPromise();
    return response;
  }
  public async getDuty(id : number) {
    let response =  this.http.get<Duty>(URL + '/api/Duties/' +id).toPromise();
    return response;
 }
  public async createDuty(duty : Duty) {
    let response = await this.http.post(URL + '/api/Duties' , duty).toPromise();
    return response;
  }

  public async updateDuty(id: number, Duty : Duty){
    let response = await this.http.put(URL +'/api/Duties/' + id , Duty).toPromise();
    return response;
  }

  public async deleteDuty(id : number){
    let response = await this.http.delete(URL + '/api/Duties/'+id).toPromise();
    console.log(URL + '/api/Duties/'+id);
    return response;
  }
}
