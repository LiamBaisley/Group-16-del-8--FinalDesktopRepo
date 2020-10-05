import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { UserTypeService } from '../../Services/user-type.service'
import { UserType } from '../../Models/user-type'
import { Router } from '@angular/router';
import { HttpClient , HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {


  public UserTypeInputValue : string;
  public usertypes;
  public id: any;
  UserType : UserType = new UserType();
 

  constructor( private service: UserTypeService) { }

  async ngOnInit() {
    this.usertypes = await this.service.getUserTypes();
    console.log(this.usertypes);
    
  }

  
  async SubmitForm(){
    await this.service.createUserType(this.UserType);
    this.usertypes = await this.service.getUserTypes();
    console.log(this.UserTypeInputValue);
    console.log("Form was submitted");
    let button = document.getElementById('DismissThis');
    button.click();
  }

  async GetUserType(id: number){
    this.UserType = await this.service.getUserType(id);
    let button = document.getElementById('ToggleUpdate');
    button.click();
  }

  async submitChanges(){
    await this.service.updateUserType(this.UserType.UserTypeID, this.UserType);
    this.usertypes = await this.service.getUserTypes();
    let button = document.getElementById('updateSuccessToggle');
    button.click(); 
  }

  getID(ID){
   window.localStorage.setItem("DeleteID", ID);
   console.log(ID);
  }

  async deleteUserType(){
    this.id = window.localStorage.getItem("DeleteID");
    let response = await this.service.deleteUserType(this.id);
    if(response == true){
      this.usertypes = await this.service.getUserTypes();
      console.log("hit");
      let button = document.getElementById('GoDelete');
      button.click();
    }
    else{
      let button = document.getElementById("NoDelete");
      button.click();
    }
  }
}
