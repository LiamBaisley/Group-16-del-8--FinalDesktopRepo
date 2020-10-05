import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../Services/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StringClass } from 'src/app/Models/string-class';

@Component({
  selector: 'app-forgotpasswordreset',
  templateUrl: './forgotpasswordreset.component.html',
  styleUrls: ['./forgotpasswordreset.component.scss']
})
export class ForgotpasswordresetComponent implements OnInit {
  public NewPassword: StringClass = new StringClass();
  public ConfirmNewPassword: string;
  public passwordsMatch: boolean;
  public ResetSuccess: boolean;
  public canChange: boolean;
  public code: StringClass = new StringClass();
  public ID: number;
  constructor(
    private authService: AuthenticationServiceService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  async ngOnInit(){
    this.route.paramMap.subscribe(params => {
        this.code.Value = params.get("code");
        this.ID = Number(params.get("ID"));
        this.doValidation(this.ID, this.code);
        
    });

    
  }

  async doValidation(ID: number, code: StringClass){

    this.canChange = await this.authService.ValidateCode(ID, code);

    if(this.canChange != true){
      let button = document.getElementById('codeButton');
      button.click();
    }
    console.log(this.code.Value);
    console.log(this.ID);
  }

  CheckMatch(){
    if(this.NewPassword.Value !== this.ConfirmNewPassword){
      this.passwordsMatch = false;
      let button = document.getElementById('modalButton');
      button.click();
    }
    else{
      this.passwordsMatch = true;
      this.ResetPass();
    }
  }

  async ResetPass(){
    let result = await this.authService.ResetPassword(this.ID, this.NewPassword);

    if (result == true){
       this.ResetSuccess = true;
    }
    else{
     //let button = document.getElementById("OopsButton");
     //button.click();
     this.NewPassword.Value = "";
     this.ConfirmNewPassword = "";
    }
    console.log("password reset");
  }
}
