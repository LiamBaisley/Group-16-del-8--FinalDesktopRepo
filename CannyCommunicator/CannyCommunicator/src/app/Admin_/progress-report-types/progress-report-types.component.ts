import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { PRTypeCrud } from 'src/app/Models/prtype-crud';
import { PRTypeService } from 'src/app/Services/prtype.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';// Activated route to carry the ID through




@Component({
  selector: 'app-progress-report-types',
  templateUrl: './progress-report-types.component.html',
  styleUrls: ['./progress-report-types.component.scss']
})

export class ProgressReportTypesComponent implements OnInit {
public ProgressReportType:PRTypeCrud = new PRTypeCrud;
  public ID:any;
  public ProgressReportTypes:any;
  public Input2value: string;
  PRTypeCrudmodel: PRTypeCrud = new PRTypeCrud;
  
  
  constructor(private PRTypeService: PRTypeService , private http:HttpClient, private route:ActivatedRoute) {
    
    this.route.paramMap.subscribe(params=>{
      this.ID = +params.get('id');
    });

  }

  
  async ngOnInit() {
    this.ProgressReportTypes = await this.PRTypeService.getPRType();
    console.log(this.ProgressReportTypes);
  }
  
  Delete(id){
    window.localStorage.setItem("DeleteID", id)
    console.log(id);
   }

  async DeleteConfirm(){
    this.ID=window.localStorage.getItem("DeleteID")
    let response = await this.PRTypeService.deletePRType(this.ID);
    if( response == true ){
    this.ProgressReportTypes = await this.PRTypeService.getPRType();
    let button = document.getElementById('GoDelete');
    button.click();
    }
    else{
      let button = document.getElementById('NoDelete');
      button.click();
    }
   }

  async SubmitForm(){
    this.PRTypeCrudmodel.Type= this.Input2value;
    console.log(this.Input2value);
    let response = await this.PRTypeService.createPRType(this.PRTypeCrudmodel);
    this.ProgressReportTypes = await this.PRTypeService.getPRType();
    this.ngOnInit();
  }

 async SubmitChanges(Type:string, PRTID:string){
    console.log(PRTID);
    this.ProgressReportType.PRTID=Number(PRTID);
    this.ProgressReportType.Type= Type;
    await this.PRTypeService.updatePRType(Number(PRTID), this.ProgressReportType);
    this.ProgressReportTypes = await this.PRTypeService.getPRType();
    console.log(this.ProgressReportType);
    console.log("submit");
  }
 
  log(x){
    console.log(x);
  }
 
}

  

