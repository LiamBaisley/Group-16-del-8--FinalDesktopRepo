import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classes } from 'src/app/Admin_/send-message/Model/classes.model'

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http  :HttpClient) { }


  
  public async getclasses(){
    let response = await this.http.get(URL+'/Classes').toPromise();
    return response;
  }
}
