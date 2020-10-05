import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ViewChild , ElementRef} from '@angular/core';
import { Duty } from '../../Models/duty';
import {DutyServiceService} from '../../Services/duty-service.service';
import { id } from 'date-fns/locale';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {

  public DutyInputValue: string;
  public duties;
  public id: any;
  public duty : Duty = new Duty();


  constructor( private dutyService : DutyServiceService) { }

  async ngOnInit() {
  this.duties = await this.dutyService.getDuties();
  
  }

  async getDuty(ID: number){
    console.log("GetDuty");
    this.duty = await this.dutyService.getDuty(ID);
    console.log(this.duty);
    let button = document.getElementById("UpdateModal");
    button.click();
  }

  
  async SubmitForm(){
   this.duty.Description = this.DutyInputValue;
   this.dutyService.createDuty(this.duty);
   this.duties = await this.dutyService.getDuties();
  }


  async submitChanges(){
    console.log(this.duty);
    await this.dutyService.updateDuty(this.duty.DutyID, this.duty);
    this.duties = await this.dutyService.getDuties();
    let button = document.getElementById("DismissUpdate");
    button.click();
  }

  getID(ID){
   window.localStorage.setItem("DeleteID", ID);
   console.log(ID);
  }

  async deleteDuty(){
    this.id = window.localStorage.getItem("DeleteID");
    let response = await this.dutyService.deleteDuty(this.id);
    if(response == false){
      let button = document.getElementById('ToggleModal');
      button.click();
    }
    else{
      let button = document.getElementById('DeleteSuccessModal');
      button.click();
    }
    this.duties = await this.dutyService.getDuties();
  }

}
