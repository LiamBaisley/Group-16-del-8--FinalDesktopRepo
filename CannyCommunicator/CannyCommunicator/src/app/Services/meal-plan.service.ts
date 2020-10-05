import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealPlan } from '../Models/meal-plan';
import { de } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
 api = 'https://localhost:44302/api/MealPlan'
 api2='https://localhost:44302/api/MealPlanReads'
  constructor(private http: HttpClient) { }
  //READ
  public async getmealplan(){
    console.log("x");
    let result =  await this.http.get(this.api+'/Get').toPromise();
    console.log(result);
    return result;
  }
  //READ
  public async getdays(){
    let result =  await this.http.get(this.api2+'/GetDays').toPromise();
    console.log(result);
    return result;
  }
  //READ
  public async gettypes(){
    console.log("x");
    let result =  await this.http.get(this.api2+'/GetTypes').toPromise();
    console.log(result);
    return result;
  }
  //READ
  public async getfoods(){
    console.log("x");
    let result =  await this.http.get(this.api2+'/GetFoods').toPromise();
    console.log(result);
    return result;
  }

  //GET ONE RECORD WITH ID 
  public async getmealplanID(id: number){
    let response = await this.http.get(`${this.api}` +`/GetByID?id=${id}`).toPromise();
    return response;
  }

//DELETE
public async deletemealplan(id: number){
  let response = await this.http.delete(`${this.api}`+`/Delete/?id=${id}`).toPromise();
  console.log(`${this.api}`+`/Delete/?id=${id}`);
  return response;
}

//CREATE
public async createmealplan(mealplan: MealPlan,FoodID:number){
  console.log(mealplan);
  let response = await this.http.post(`${this.api}`+ `/Post?FoodID=${FoodID}`, mealplan).toPromise();
  return response;
}

//UPDATE
public async updatemealplan(id: number, mealplan: MealPlan,FoodID:number){
  let reposnse = await this.http.put(`${this.api}` + `/Put?id=${id}&FoodID=${FoodID}`, mealplan).toPromise();
  return reposnse;
}



}
