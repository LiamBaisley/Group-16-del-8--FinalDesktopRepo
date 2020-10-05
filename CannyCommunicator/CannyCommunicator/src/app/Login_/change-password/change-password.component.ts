import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationServiceService } from "../../Services/authentication-service.service";
import { StringClass } from 'src/app/Models/string-class';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public NewPassword: StringClass = new StringClass();
  public ConfirmNewPassword: string;
  public passwordsMatch: boolean;
  public ResetSuccess: boolean;
  constructor(
    private authService: AuthenticationServiceService
  ) { }

  ngOnInit(): void {
  }

  CheckMatch(){
    console.log(this.NewPassword.Value , this.ConfirmNewPassword )
    if(this.NewPassword.Value !== this.ConfirmNewPassword){
      console.log(this.NewPassword.Value+" "+this.ConfirmNewPassword)
      this.passwordsMatch = false;
      let button = document.getElementById('modalButton');
      button.click();
    }
    else{
      console.log("Match");
      this.passwordsMatch = true;
      this.ResetPass();
    }
  }

  async ResetPass(){
    let result = await this.authService.ChangePassword(this.NewPassword);

    if (result == true){
       this.ResetSuccess = true;
    }
    else{
      
     let button = document.getElementById("modalButton");
     button.click();
    }
    console.log("password reset");
  }

}
