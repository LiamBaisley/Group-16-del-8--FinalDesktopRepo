import { Component, OnInit } from '@angular/core';
 import { AuthenticationServiceService } from '../../Services/authentication-service.service';
 import { User } from '../../Models/user';
 import * as jwt_decode from 'jwt-decode';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public UsernameValue: string;
  public PasswordValue: string;
  public token: string;
  public user: User = new User;
  constructor(
    private authenticationService: AuthenticationServiceService,
    private router: Router
  ) { }
  
  public async Login(){
    console.log("loginHit");
    this.user.Username = this.UsernameValue;
    this.user.Password = this.PasswordValue;
    this.token = await this.authenticationService.login(this.user);
    if(this.token != ""){
    localStorage.setItem('token', this.token);
    console.log(this.token);
    let deocodedToken = jwt_decode(this.token);
    switch(deocodedToken['UserType'].toUpperCase()){
      case 'ADMIN':{
        let button = document.getElementById("ToggleModal");
        button.click();
        this.UsernameValue = "";
        this.PasswordValue = "";
        break;
      }
      case 'TEACHER':{
        this.router.navigate(['/TeacherHome']);
        break;
      }
    }
  }
  else{
      let button = document.getElementById("ToggleModal");
      button.click();
      this.UsernameValue = "";
      this.PasswordValue = "";
  }
}

  ngOnInit(): void {
  }

}
