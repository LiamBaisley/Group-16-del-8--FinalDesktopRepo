import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { EmpTypeCrud } from 'src/app/Models/emp-type-crud';
import { EmpTypeService } from 'src/app/Services/emp-type.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';// Activated route to carry the ID through
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.scss']
})
export class EmployeeTypeComponent implements OnInit {
  public EmployeeTypes:any;
  public EmployeeType:EmpTypeCrud =new EmpTypeCrud;
  public ID:any;
  public FieldInputvalue: string;
  EmpTypeCrudmodel: EmpTypeCrud = new EmpTypeCrud;
  
  
  constructor(private EmpTypeService: EmpTypeService , private http:HttpClient, private route:ActivatedRoute) {
    
    this.route.paramMap.subscribe(params=>{
      this.ID = +params.get('id');
    });

  }

  async ngOnInit() {
    this.EmployeeTypes = await this.EmpTypeService.getEmpType();
    console.log(this.EmployeeTypes)
  }
  
  Delete(id){
    window.localStorage.setItem("DeleteID", id)
    console.log(id);
   }
   async DeleteConfirm(){
     this.ID=window.localStorage.getItem("DeleteID")
     await this.EmpTypeService.deleteEmpType(this.ID);
     this.EmployeeTypes = await this.EmpTypeService.getEmpType();
   }

  async SubmitForm(){
    this.EmpTypeCrudmodel.Type= this.FieldInputvalue;
    console.log("hit");
    await this.EmpTypeService.createEmpType(this.EmpTypeCrudmodel);
    this.EmployeeTypes = await this.EmpTypeService.getEmpType();
    
  }

  async SubmitChanges(Type:string, EmployeeTypeID:string){
    console.log(EmployeeTypeID);
    this.EmployeeType.EmployeeTypeID=Number(EmployeeTypeID);
    this.EmployeeType.Type= Type;
    await this.EmpTypeService.updateEmpType(Number(EmployeeTypeID), this.EmployeeType);
    this.EmployeeTypes = await this.EmpTypeService.getEmpType();
    console.log(this.EmployeeType);
    console.log("submit");
  }

  log(x){
    console.log(x);
  }
 
}
