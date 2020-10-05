import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../Models/food-item';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FoodItemServiceService {

  URL = 'https://localhost:44302/api';
  api ='https://localhost:44302/api/MealPlanReads'

  constructor( private http : HttpClient) { }
  //READ
  public async getFoodItems(){
    let result =  await this.http.get<FoodItem[]>(this.URL+'/Foods').toPromise();
    return result;
  }

    //READ
    public async gettypes(){
      console.log("x");
      let result =  await this.http.get(this.api+'/GetTypes').toPromise();
      console.log(result);
      return result;
    }

//GET ONE RECORD WITH ID 
  public async getFoodItemID(id: number){
    let response = await this.http.get(this.URL+'/Foods/'+id).toPromise();
    return response;
  }

//CREATE
  public async createFoodItem(foodItem: FoodItem){
    console.log(foodItem);
    let response = await this.http.post(this.URL+'/Foods', foodItem).toPromise();
    return response;
  }

//UPDATE
  public async updateFoodItem(id: number, foodItem: FoodItem){
    let reposnse = await this.http.put(this.URL+'/Foods/'+id, foodItem).toPromise();
    return reposnse;
  }

//DELETE
 public async deleteFoodItem(id: number){
    let response = await this.http.delete(this.URL+'/Foods/'+id).toPromise();
    return response;
  }

}
