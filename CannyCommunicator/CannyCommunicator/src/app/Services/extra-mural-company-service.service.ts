import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraMuralCompany } from '../Models/extra-mural-company'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExtraMuralCompanyServiceService {

   URL = 'https://localhost:44302/api';

  constructor(private http : HttpClient , private httpmodule : HttpClientModule ) { }

   //READ
   public async GetExtramuralCompanies()  {
    let response = await this.http.get(this.URL+'/ExtramuralCompanies').toPromise();
    console.log(response);
     return response; 
  }

  public async getExtramuralCompany(id : number) {
     let response = await this.http.get(this.URL  + '/ExtramuralCompanies/' +id).toPromise();
     return response;
  }
   //READ
   public async GetExtramurals()  {
    let response = await this.http.get(this.URL+'/Extramurals').toPromise();
    console.log(response);
     return response; 
  }

  public async getExtramural(id : number) {
     let response = await this.http.get(this.URL  + '/Extramurals/' +id).toPromise();
     return response;
  }
  public async createExtraMuralCompany(extraMuralCompany : ExtraMuralCompany) {
    console.log(extraMuralCompany);
    let response = await this.http.post (this.URL + '/ExtramuralCompanies' , extraMuralCompany).toPromise();
    return response;
  }

  public async updateExtraMuralCompany(id: any, extraMuralCompany : ExtraMuralCompany){
    debugger;
    let response = await this.http.put(this.URL +'/ExtramuralCompanies/' +id, extraMuralCompany).toPromise();
    console.log(this.URL +'/ExtramuralCompanies/' +id);
    console.log(extraMuralCompany);
    return response;
  }

  public async deleteExtraMuralCompany(id : number){
    let response = await this.http.delete(this.URL+'/ExtramuralCompanies/'+id).toPromise()
    return response;
  }
}
