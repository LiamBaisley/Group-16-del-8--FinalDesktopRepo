import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewPackage } from '../Models/new-package';
import { UpdateParentModel } from '../Models/update-parent-model';
import { AllocateDuty } from '../Models/allocate-duty';
import { stringify } from 'querystring';

const URL=environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public async GetPackages(){
    let response = this.http.get(URL+"/GetPackages").toPromise();
    return response;
  }

  public async GetPAckageNames(){
    let response = this.http.get(URL+"/GetPackageNames").toPromise();
    return response;
  }

  public async CreatePackage(newPackage: NewPackage){
    let response = this.http.post(URL+"/NewFee", newPackage).toPromise();
    return response;
  }

  public async GetAllAccounts(){
    let response = this.http.get(URL+"/GetFamilyAccounts").toPromise();
    return response;
  }

 public async GetSearchResults(searchCriteria){
   let response = this.http.get(URL+"/SearchAccounts/"+searchCriteria).toPromise();
   return response;
 }

  public async getFamilyDetails(childID: number){
    let response = this.http.post<UpdateParentModel>(URL+"/GetDetails", childID).toPromise();
    return response;
  }

  public async getAssignedDuties(){
    let response = this.http.get(URL+"/GetAllocatedDuties").toPromise();
    return response;
  }

  public async GetAssignDutyInfo(){
    let response = this.http.get(URL+"/GetAllocateDutyInfo").toPromise();
    return response;
  }

  public async AssignDuty(model: AllocateDuty){
    let response = this.http.post<boolean>(URL+"/AllocateDuty", model).toPromise();
    return response;
  }

  public async DeleteAcccount(childID: number){
    let response = this.http.delete(URL+"/DeleteFamily/"+childID).toPromise();
    return response;
  }

  public async GetExtramuralDetails(){
    let response = this.http.get(URL+"/GetExtramuralNames").toPromise();
    return response;
  }

  public async GenerateExtramuralReport(ExtramuralID: number){
    let response = this.http.post(URL+"/GenerateExtramuralReport", ExtramuralID).toPromise();
    return response;
  }

  public async updateFamily(ID: number, model: UpdateParentModel){
    let response = this.http.post(URL+"/AdminUpdateFamily/"+ID, model).toPromise();
    return response;
  }
}
