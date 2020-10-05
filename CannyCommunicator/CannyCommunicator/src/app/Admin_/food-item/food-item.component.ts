import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { FoodItem } from '../../Models/food-item';
import { FoodItemServiceService } from '../../Services/food-item-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
import { MealPlan } from '../../Models/meal-plan';
import { MealPlanService } from 'src/app/Services/meal-plan.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit {

  public foods;
  public ItemValue : string;
 
  public selectListValueType: number;
  public ID : any;
  public oldItem : any;
  public types:any;
  public FoodItemModel : FoodItem = new FoodItem();


  constructor(private service : FoodItemServiceService, private mealService : MealPlanService ) {
     }

  async ngOnInit() {
    this.foods = await  this.service.getFoodItems();
    this.types = await this.mealService.gettypes();
  }

  async SubmitForm(){
    this.FoodItemModel.FoodDescription = this.ItemValue;
    this.FoodItemModel.MealTypeID = this.selectListValueType;
    await this.service.createFoodItem(this.FoodItemModel);
    this.foods = await  this.service.getFoodItems();
    this.types = await this.mealService.gettypes();
    console.log(this.FoodItemModel);

    console.log("Form was submitted");
  }

  log(x){
    console.log(x);
  }

  async UpdateFoodItem(id){
    this.oldItem = await this.service.getFoodItemID(id);
    this.ItemValue = this.oldItem.FoodDescription;
    this.selectListValueType = this.oldItem.MealTypeID;
    window.localStorage.setItem("UpdateID", id);
    console.log(id);
  }

 async SubmitUpdateForm(){
    this.ID = window.localStorage.getItem("UpdateID");
    this.FoodItemModel.FoodID = this.ID;
    this.FoodItemModel.FoodDescription = this.ItemValue;
    this.FoodItemModel.MealTypeID = this.selectListValueType;
    console.log(this.FoodItemModel);
    await this.service.updateFoodItem(this.ID, this.FoodItemModel);
    this.foods = await  this.service.getFoodItems();
    this.types = await this.mealService.gettypes();
  }

  DeleteItem(id){
    window.localStorage.setItem("DeleteID", id);
    console.log(id);
  }

  async DeleteConfirm(){
    this.ID = window.localStorage.getItem("DeleteID");
    let response = await this.service.deleteFoodItem(this.ID);
    if (response == true){
      this.foods = await  this.service.getFoodItems();
      this.types = await this.mealService.gettypes();
      let button = document.getElementById('GoDelete');
      button.click();
    }
    else{
      let button = document.getElementById('NoDelete');
      button.click();
    }
  }

}
