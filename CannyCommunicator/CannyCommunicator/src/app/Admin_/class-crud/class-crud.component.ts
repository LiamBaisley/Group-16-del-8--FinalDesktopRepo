import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClassCrud } from 'src/app/Models/class-crud';
import {ClassService} from 'src/app/Services/class.service';
import {ClassGradeService} from 'src/app/Services/class-grade.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';// Activated route to carry the ID through

@Component({
  selector: 'app-class-crud',
  templateUrl: './class-crud.component.html',
  styleUrls: ['./class-crud.component.scss']
})
export class ClassCrudComponent implements OnInit {
  
  public TextboxInputvalue: string;
  public TextInput1value: string;
  public SelectList1value: string;
  public SelectList2value: string;
  public ClassGrades: any;
  public ClassGrade: any;
  public Classes:any;
  public Class:any;
  public current:any;
  ID:any;
  classcrudmodel: ClassCrud = new ClassCrud;
 
 

  constructor( private classservice: ClassService ,private ClassGradeService: ClassGradeService ,private http:HttpClient, private route:ActivatedRoute) { 
  
  this.route.paramMap.subscribe(params=>{
        this.ID = +params.get('id');  
       });
  }

  async ngOnInit(){
    this.Classes = await this.classservice.getClass();
    console.log(this.Classes);
    
    this.ClassGrade = await this.ClassGradeService.getClassGrade();
    console.log(this.ClassGrade);
  }

  Delete(id){
    window.localStorage.setItem("DeleteID", id)
    console.log(id);
   }
   async DeleteConfirm(){
     this.ID=window.localStorage.getItem("DeleteID")
     let response = await this.classservice.deleteClass(this.ID);
     if(response == true){
     this.Classes = await this.classservice.getClass();
     
     this.ClassGrade = await this.ClassGradeService.getClassGrade();
     let button = document.getElementById('GoDelete');
     button.click();
     }
     else{
       let button = document.getElementById('NoDelete');
       button.click();
     }
     this.ngOnInit();
   }

async Update(ID){

 this.current = await this.classservice.getClassID(ID);
 window.localStorage.setItem("ClassID",ID);
 console.log(this.current);
  this.TextInput1value = this.current.Name;
  this.SelectList2value = this.current.ClassGradeID;
}
 async SubmitForm(){ 
    
    this.classcrudmodel.Name= this.TextboxInputvalue;
    this.classcrudmodel.ClassGradeID = this.SelectList1value;
    console.log(this.TextboxInputvalue);
    await this.classservice.createClass(this.classcrudmodel);
    this.Classes = await this.classservice.getClass();
    
    this.ClassGrade = await this.ClassGradeService.getClassGrade();
  
  }
  

   async SubmitChanges(){
     this.ID = window.localStorage.getItem("ClassID");
     this.classcrudmodel.ClassID = this.ID;
    this.classcrudmodel.Name= this.TextInput1value;
    this.classcrudmodel.ClassGradeID = this.SelectList2value;
    await this.classservice.updateClass(this.ID, this.classcrudmodel);
    this.Classes = await this.classservice.getClass();
    
    this.ClassGrade = await this.ClassGradeService.getClassGrade();
  }

  log(x){
    console.log(x);
  }
}


