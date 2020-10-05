import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from '../Models/document.model';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient) { }
  
  public async createDoc(head: Document ){
    let response = await this.http.post(URL+'/Documents', head).toPromise();
    return response;
  }

  public async getDoc(){
    let response = await this.http.get(URL+'/Documents').toPromise();
    return response;
  }

  public async uploadfile(file){
    let result = this.http.post(URL+ "/Uploadfile", file).toPromise();
    return result;
  }

  public async removeDocument(id : number)
  {
    let response = await this.http.delete(URL+'/Documents/'+id).toPromise();
    return response;
  }

  public async getFile( ID:number)
  {
    let response = await this.http.get(URL+'/Getfile/'+ID).toPromise()
    return response;
  }

  public async updateupdatedoc(document : Document, id : number )
  {
      let reposnse = await this.http.put(URL+'/Documents/'+id, document).toPromise();
      return reposnse;
  }

  public async searchdoc(searchcriteria : string){
    let response = await this.http.get(URL + '/SearchDocuments/'+ searchcriteria).toPromise();
    return response;
  }
}