import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraMuralCrud } from '../Models/extra-mural-crud';// Import of Class

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class ExtraMuralService {

  constructor(private http: HttpClient) { }
      //READ
    public async getExtraMural(){
      let result =  await this.http.get<ExtraMuralCrud[]>(URL+'/Extramurals').toPromise();
       return result; 
     
    }
      //GET ONE RECORD WITH ID 
      public async getExtraMuralID(id: number){
        let response = await this.http.get(URL+'/Extramurals/'+id).toPromise();
        return response;
      }
    
    //CREATE
  public async createExtraMural(extraMuralCrud: ExtraMuralCrud){
    console.log(extraMuralCrud);
    let response = await this.http.post(URL+'/Extramurals', extraMuralCrud).toPromise();
    return response;
  }
//UPDATE
  public async updateExtraMural(id: number, extraMuralCrud: ExtraMuralCrud){
    let reponse = await this.http.put(URL+'/Extramurals/'+id, extraMuralCrud).toPromise();
    return reponse;
  }
//DELETE
 public async deleteExtraMural(id: number){
    let response = await this.http.delete(URL+'/Extramurals/'+id).toPromise();
    return response;
  }
}


