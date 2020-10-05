import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClassGradeCrud } from 'src/app/Models/class-grade-crud';
import { ClassGradeService } from 'src/app/Services/class-grade.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';// Activated route to carry the ID through


@Component({
  selector: 'app-class-grade',
  templateUrl: './class-grade.component.html',
  styleUrls: ['./class-grade.component.scss']
})
export class ClassGradeComponent implements OnInit {
  public Input1value: any;
  public ClassGrades:any;
  public ID:any;
  ClassGradeCrudmodel:  ClassGradeCrud = new  ClassGradeCrud;
  public ClassGrade:ClassGradeCrud =new ClassGradeCrud;
  

  constructor(private ClassGradeService: ClassGradeService , private http:HttpClient, private route:ActivatedRoute) { 
    
    this.route.paramMap.subscribe(params=>{
      this.ID = +params.get('id');
    });

  }
      async ngOnInit() {
       this.ClassGrades = await this.ClassGradeService.getClassGrade();
       console.log(this.ClassGrades)
      }

      Delete(id){
        window.localStorage.setItem("DeleteID", id)
        console.log(id);
       }
      async DeleteConfirm(){
         this.ID=window.localStorage.getItem("DeleteID")
         let response = await this.ClassGradeService.deleteClassGrade(this.ID);
         if(response == true){
          this.ClassGrades = await this.ClassGradeService.getClassGrade();
          let button = document.getElementById('GoDelete');
          button.click();
         }
         else{
           let button = document.getElementById('NoDelete');
           button.click();
         }
         this.ngOnInit()
       }

async SubmitForm(){
  console.log("here");
  this.ClassGradeCrudmodel.ClassGradeName= this.Input1value;
  await this.ClassGradeService.createClassGrade(this.ClassGradeCrudmodel);
  this.ClassGrades = await this.ClassGradeService.getClassGrade();
  this.ngOnInit();

}

async SubmitChanges(ClassGradeName:string, ClassGradeID:string){
  console.log(ClassGradeID);
  this.ClassGrade.ClassGradeID=Number(ClassGradeID);
  this.ClassGrade.ClassGradeName= ClassGradeName;
  await this.ClassGradeService.updateClassGrade(Number(ClassGradeID), this.ClassGrade);
  this.ClassGrades = await this.ClassGradeService.getClassGrade();
  console.log(this.ClassGrade);
  console.log("submit");
}

log(x){
  console.log(x);
}
}

