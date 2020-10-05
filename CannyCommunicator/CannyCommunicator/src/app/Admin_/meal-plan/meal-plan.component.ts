import { Component, OnInit } from '@angular/core';
import { NgModel, FormGroup } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { formatDate, DatePipe, CommonModule } from '@angular/common';
import { MealPlanService } from 'src/app/Services/meal-plan.service';
import { MealPlan } from 'src/app/Models/meal-plan';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.scss']
})
export class MealPlanComponent implements OnInit { 
  public abc:any;
  public ID:any;
  public date: Date;
  public selectListValueDay: number;
  public selectListValueType: number;
  public selectListValueFood1: number;
  public mealplan : MealPlan =new MealPlan;
public oldmealplan :any;
public days:any;
public foods:any;
public types:any;


  @ViewChild('dateinput') dateref: NgModel;
  @ViewChild('dateinput') dateref2: NgModel;
  
  constructor(private service:MealPlanService) { }

async  ngOnInit(){
 this.abc = await this.service.getmealplan();

 this.abc = Array.of(this.abc);
 console.log(this.abc)
 this.days = await this.service.getdays();
 this.foods= await this.service.getfoods();
 this.types=await this.service.gettypes();
  }

  Delete(id){
   window.localStorage.setItem("DeleteID", id)
   console.log(id);
  }
  DeleteConfirm(){
    this.ID=window.localStorage.getItem("DeleteID")
    this.service.deletemealplan(this.ID);
    this.abc = this.service.getmealplan();
  }
AddMealPlan(){
this.mealplan.DayID = this.selectListValueDay;
this.mealplan.MealTypeID= this.selectListValueType;
this.mealplan.Date= this.date;
this.service.createmealplan(this.mealplan,this.selectListValueFood1);
 this.abc =  this.service.getmealplan();
}
SubmitForm(){
this.ID=window.localStorage.getItem("UpdateID");
this.mealplan.DayID = this.selectListValueDay;
this.mealplan.MealTypeID= this.selectListValueType;
this.mealplan.Date= this.date;
this.service.updatemealplan(this.ID,this.mealplan,this.selectListValueFood1);
this.abc =  this.service.getmealplan();

}
async UpdateMealPlan(id){
  this.oldmealplan =  await this.service.getmealplanID(id);
this.selectListValueDay= this.oldmealplan.DayID;
 this.selectListValueType = this.oldmealplan.MealTypeID;
 this.date = new Date();
 this.date= this.oldmealplan.Date;
 this.selectListValueFood1= this.oldmealplan.FoodID;
 window.localStorage.setItem("UpdateID", id);
 console.log(id);

}
 
  datevalidate(){
    var today:any;
   today=  Date.now();
    //check if the date is larger than 1 january 2018
    if(this.dateref.control.value <= today){
      //if it isnt then we set an error we can access on the front end
      this.dateref.control.setErrors({'datelimit': true});
    }
    if(this.dateref2.control.value<= today){
      //if it isnt then we set an error we can access on the front end
      this.dateref2.control.setErrors({'datelimit': true});
    }
}
}
