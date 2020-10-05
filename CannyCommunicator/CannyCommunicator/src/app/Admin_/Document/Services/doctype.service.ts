import { Injectable } from '@angular/core';
import { Documenttype } from '../Models/documenttype.model'
import { HttpClient } from '@angular/common/http';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class DoctypeService {

  constructor( private http: HttpClient ) { }

  public async createDocType(doctypeinfo: Documenttype){
    let response = await this.http.post(URL+'/DocumentTypes', doctypeinfo).toPromise();
    console.log(response)
    return response;
    
  }

  public async getdoctype(){
    let response = await this.http.get(URL+'/DocumentTypes').toPromise();
    return response;
  }

  public async updateDocType(id: number, doctype: Documenttype){
    let reposnse = await this.http.put(URL+'/DocumentTypes/'+id, doctype).toPromise();
    return reposnse;
  }

}
