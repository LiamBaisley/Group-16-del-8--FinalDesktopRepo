import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtraMuralCrud } from 'src/app/Models/extra-mural-crud';
import {ExtraMuralService} from 'src/app/Services/extra-mural.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';// Activated route to carry the ID through
import { MealPlanService } from 'src/app/Services/meal-plan.service';

@Component({
  selector: 'app-extra-mural',
  templateUrl: './extra-mural.component.html',
  styleUrls: ['./extra-mural.component.scss']
})
export class ExtraMuralComponent implements OnInit {
  public Extramurals : any;
  public days:any;
  public ID:any;
  public EMInputvalue: string;
  public EMInputvalueName:any;
  public EMInput1value: string;
  public selectListDay: string;
  public selectListValueDay:any;
  public Description: string;
  public Name: string;
  public Cost:any;
  public NumInputvalue: number;
  extramuralcrudmodel: ExtraMuralCrud = new ExtraMuralCrud;
public current:any;
  
  @ViewChild('NumInput') numref: NgModel;
  
  constructor(private service:MealPlanService, private extraMuralservice: ExtraMuralService ,private http:HttpClient, private route:ActivatedRoute) {
    
  this.route.paramMap.subscribe(params=>{
        this.ID = +params.get('id');
       });
   }

   async ngOnInit(){
    this.days = await this.service.getdays();
    this.Extramurals = await this.extraMuralservice.getExtraMural();
    console.log(this.Extramurals);
  }
  
  Delete(id){
    debugger;
    window.localStorage.setItem("DeleteID", id)
    console.log(id);
   }
   async DeleteConfirm(){
     this.ID=window.localStorage.getItem("DeleteID")
     let response = await this.extraMuralservice.deleteExtraMural(this.ID);
     if(response == true){
       this.Extramurals = await this.extraMuralservice.getExtraMural();
       let button = document.getElementById('GoDelete');
       button.click();
     }
     else{
       let button = document.getElementById('NoDelete');
     }
   }

 async SubmitForm(){
    this.extramuralcrudmodel.ExtraMuralName= this.EMInputvalueName;
    this.extramuralcrudmodel.Cost =this.NumInputvalue;
    console.log(this.NumInputvalue);
    this.extramuralcrudmodel.DayID = this.selectListDay;
    this.extramuralcrudmodel.ExtraMuralDescription = this.EMInputvalue;
    console.log(this.EMInputvalue);
    let response = await this.extraMuralservice.createExtraMural(this.extramuralcrudmodel);
    this.Extramurals = await this.extraMuralservice.getExtraMural();
  }

async Update(ID){
 window.localStorage.setItem("EMID",ID);
 this.current = await this.extraMuralservice.getExtraMuralID(ID);
 this.Name = this.current.ExtramuralName;
 this.selectListDay = this.current.DayID;
 this.Description = this.current.ExtramuralDescription;
 this.Cost = this.current.Cost;

}

  async SubmitChanges(){
     this.ID = window.localStorage.getItem("EMID");
     this.extramuralcrudmodel.ExtraMuralID = this.ID;
    this.extramuralcrudmodel.ExtraMuralName= this.Name;
    this.extramuralcrudmodel.Cost =this.Cost;
    this.extramuralcrudmodel.DayID = this.selectListDay;
    this.extramuralcrudmodel.ExtraMuralDescription = this.Description;
    await this.extraMuralservice.updateExtraMural(this.ID, this.extramuralcrudmodel);
    this.Extramurals = await this.extraMuralservice.getExtraMural();
  }


  log(x){
    console.log(x);
  }
  
  //this is the function that validates the number input
  validate(){
    //check that the number is bigger than 10
    if(this.numref.control.value<10){
      //if it isnt then set an error that we can check for in the html file
      this.numref.control.setErrors({'min': true});
    }
    //this function checks that the number entered is smaller than 100
    if(this.numref.control.value>99999){
      //if it isnt then set an error that we can check for in the html file
      this.numref.control.setErrors({'max': true});
    }

    //this can be used to check if a number is an innteger (in other words it may not have any decimal values!)
    // if(!Number.isInteger(this.numref.control.value)){
      //if it isnt an integer then set an error we can check for on the html page
    //   this.numref.control.setErrors({'notinteger': true});
    // }

    if(this.countdecimals(this.numref.control.value)>2){
      //if it isnt then set an error that we can check for in the html file
      this.numref.control.setErrors({'decimalOver': true});
    }
  }
//this is a function used to count the decimal places in a number
  countdecimals(num: number): number{
     if(Math.floor(num) !== num){
       return num.toString().split(".")[1].length || 0;
     }
     return 0;
  }
}
  
  
