import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/Services/authentication-service.service';
import { StringClass } from 'src/app/Models/string-class';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public EmailValue: StringClass =  new StringClass();
  constructor(private authService: AuthenticationServiceService) { }

  ngOnInit(): void {
    
  }

  async ResetPass(){
    console.log("resetting");
    let response: boolean = await this.authService.RequestResetPassword(this.EmailValue);
    if(response == false){
      let button = document.getElementById('ModalButton');
      button.click();
      this.EmailValue.Value = "";
    }
    else{
      let button = document.getElementById('successModalButton');
      button.click();
    }
  }
}
