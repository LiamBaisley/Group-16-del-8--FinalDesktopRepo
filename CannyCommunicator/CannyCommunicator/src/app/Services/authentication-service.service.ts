import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegistrationModel } from '../Models/registration-model';
import { StringClass } from '../Models/string-class';


const URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})


export class AuthenticationServiceService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/LoginPage']);
  }

  public async login(user: User){
    localStorage.setItem('Ignore', 'ignore');
    let result = this.http.post<string>(URL+"/Login", user).toPromise();
    return result;
  }

  public async ChangePassword(password: StringClass){
    let result = await this.http.put(URL+"/ChangePassword", password).toPromise();
    return result;
  }

  public async ValidateCode(ID: number, Code: StringClass){
    let result = this.http.post<boolean>(URL+"/ValidateCode/"+ID, Code).toPromise();
    return result;
  }

  public async ResetPassword(ID: number, NewPassword: StringClass){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let result = this.http.post<boolean>(URL+"/PasswordReset/"+ID, NewPassword, {headers: headers}).toPromise();
    return result;
  }

  public async GetRegPageInfo(){
    let result = this.http.get(URL+"/GetApplicationInformation").toPromise();
    return result;
  }

  public async UploadFile(file, ID){
     let result = this.http.post(URL+ "/UploadFile"+ ID, file).toPromise();
     return result;
  }

  public async Register(regModel: RegistrationModel){
    let result = this.http.post(URL+"/Register", regModel).toPromise();
    return result;
  }

  public async RequestResetPassword(email: StringClass){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    console.log(JSON.stringify(email));
    let response = this.http.post<boolean>(URL+"/RequestResetPassword", JSON.stringify(email), {headers: headers}).toPromise();
    return response;
  }
}
