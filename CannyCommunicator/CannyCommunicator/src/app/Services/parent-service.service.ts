import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { UpdateParentModel } from '../Models/update-parent-model';

const URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ParentServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  public async GetChildren(){
    let response = this.http.get(URL+"/GetChildren").toPromise();
    return response;
  }

  public async GetUpdateDetails(ID: number){
    let response = this.http.post<UpdateParentModel>(URL+"/GetParentAndPupil", ID).toPromise();
    return response;
  }

  public async updateFamily(ID: number, model: UpdateParentModel){
    let response = this.http.post(URL+"/UpdateFamily/"+ID, model).toPromise();
    return response;
  }

  public async UploadFile(file, ID){
    let result = this.http.post(URL+ "/UploadUpdateParent/"+ ID, file).toPromise();
    return result;
 }
}
