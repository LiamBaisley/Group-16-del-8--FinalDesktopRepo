import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserType } from '../Models/user-type';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})


export class UserTypeService {

  constructor( private http: HttpClient, private router: Router) { }

  //READ
  public async getUserTypes() {
    let response = await this.http.get(URL+ '/api/UserTypes').toPromise();
    console.log(response) ;
    return response;
  }

  public async getUserType(id : number) {
    let response = await this.http.get<UserType>(URL + '/api/UserTypes/' +id).toPromise();
    return response;
  }

  public async createUserType(userType : UserType) {
    console.log(userType);
    let response = await this.http.post(URL + '/api/UserTypes' , userType).toPromise();
    return response;
  }

  public async updateUserType(id: number, UserType : UserType){
    let response = await this.http.put(URL +'/api/UserTypes/' + id , UserType).toPromise();
    console.log(URL +'/api/UserTypes/' + id , UserType);
    return response;
  }

  public async deleteUserType(id : number){
    let response = await this.http.delete(URL + '/api/UserTypes/'+id).toPromise();
    console.log(URL + '/api/UserTypes/'+id);
    return response;
  }
}
