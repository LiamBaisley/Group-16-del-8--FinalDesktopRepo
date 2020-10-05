import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupportStaff } from '../Models/support-staff.model'

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class SupportStaffServiceService {

  constructor(private http  :HttpClient) { }

  public async getsupportstaff(){
    let response = await this.http.get(URL+'/SupportStaffs').toPromise();
    return response;
  }
  public async getsupportstaffType(){
    let response = await this.http.get(URL+'/EmployeeTypes').toPromise();
    return response;
  }

  public async createSupportStaff(supportstaff: SupportStaff ){
    let response = await this.http.post(URL+'/SupportStaffs', supportstaff).toPromise();
    return response;
  }

  public async UpdateSupportStaff(id: number, supportstaff: SupportStaff){
    let reposnse = await this.http.put(URL+'/SupportStaffs/'+id, supportstaff).toPromise();
    return reposnse;
  }
  public async removeSupportStaff(id : number)
  {
    let response = await this.http.delete(URL+'/SupportStaffs/'+id).toPromise();
    return response;
  }
  
}
