import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ViewChild , ElementRef} from '@angular/core';
import {ProgressReportTestCategory} from '../../Models/progress-report-test-category';
import { ProgressReportTestCategoryServiceService} from '../../Services/progress-report-test-category-service.service';
import { CriteriaModel } from '../../Models/criteria-model';
import { CriteriaServiceService } from '../../Services/criteria-service.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-progress-report-test-categories',
  templateUrl: './progress-report-test-categories.component.html',
  styleUrls: ['./progress-report-test-categories.component.scss']
})
export class ProgressReportTestCategoriesComponent implements OnInit {

  categories : ProgressReportTestCategory = new ProgressReportTestCategory();
  criteria : CriteriaModel = new CriteriaModel();
  public categorylist: any;
  public criterialist: any; 
  public classes;
  public CriteriaValue: string;
  public CategoryValue: string;
  public selectListValue: string;
  public oldCriteria: any;
  public ID : any;
public CatID:any;
  constructor( public categoryService : ProgressReportTestCategoryServiceService, private criteriaService: CriteriaServiceService) { }

  async ngOnInit() {
    this.categorylist = await this.categoryService.getCategories();
    console.log(this.categorylist);

    this.criterialist = await this.criteriaService.getCriteria();
    console.log(this.criterialist);

    this.classes = await this.categoryService.getclassgrades();
    console.log(this.classes);
  }

 async Updatecategory(CategoryName: string, CategoryID: number){
    this.categories.CategoryName = CategoryName;
    this.categories.CategoryID =CategoryID;
    await this.categoryService.updateCategory(CategoryID, this.categories);
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades();
  }

  async SubmitCatForm(){
    this.categories.CategoryName = this.CategoryValue;
    
    await this.categoryService.createCategory(this.categories);
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades();
    console.log(this.categories);
    
    console.log("Form was submitted");
  }
SetID(ID){
  window.localStorage.setItem("CategoryID",ID);
}
  async SubmitForm(){
    this.criteria.Description = this.CriteriaValue;
    this.criteria.ClassGradeID = this.selectListValue;
    this.criteria.CategoryID = window.localStorage.getItem("CategoryID");
    await this.criteriaService.createCriteria(this.criteria);
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades();
    console.log(this.criteria);
    console.log(this.CriteriaValue);
    console.log(this.selectListValue);
    console.log("Form was submitted");
  }

  log(x){
    console.log(x);
  }

  async UpdateCriteria(id,uID){
    this.oldCriteria = await this.criteriaService.getCriteriaID(id);
    this.CriteriaValue = this.oldCriteria.Description;
    this.selectListValue = this.oldCriteria.ClassGradeID;
    window.localStorage.setItem("UpdateID", id);
    window.localStorage.setItem("CategoryID",uID);
    console.log(id);
  }

  async SubmitUpdateForm(){
    this.ID = window.localStorage.getItem("UpdateID");
    this.criteria.AssessmentCriteriaID = this.ID;
    this.criteria.Description = this.CriteriaValue;
    this.criteria.ClassGradeID = this.selectListValue;
    this.criteria.CategoryID= window.localStorage.getItem("CategoryID");
    console.log(this.criteria);
    await this.criteriaService.updateCriteria(this.ID, this.criteria);
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades();
  }

  getID(id){

    window.localStorage.setItem("DeleteID", id);
    console.log(id);
  }

  async deleteConfirm(){
    this.ID = window.localStorage.getItem("DeleteID");
    let response = await this.criteriaService.deleteCriteria(this.ID);
    if (response == true){
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades();
    let button = document.getElementById('GoDelete');
    button.click();
    }
    else{
      let button = document.getElementById('NoDelete');
      button.click();
    }
    console.log("hit");

  }

  async DeleteCat(){
    this.ID = window.localStorage.getItem("CategoryID");
    let response = await this.categoryService.deleteCategory(this.ID);  
    if(response == true){
    this.categorylist = await this.categoryService.getCategories();
    this.criterialist = await this.criteriaService.getCriteria();
    this.classes = await this.categoryService.getclassgrades(); 
    let button = document.getElementById('GoDelete');
    button.click();
    }
    else{
      let button = document.getElementById('NoDelete');
      button.click();
    }
  }
}
