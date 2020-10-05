import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pupils } from 'src/app/Admin_/send-message/Model/pupils.model'

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class PupilsService {

  constructor(private http  :HttpClient) { }

  public async getpupils(){
    let response = await this.http.get(URL+'/Children').toPromise();
    return response;
  }

  public async searchpupil(searchcriteria : string){
    let response = await this.http.get(URL + '/searchChildren/'+ searchcriteria).toPromise();
    return response;
  }
}
