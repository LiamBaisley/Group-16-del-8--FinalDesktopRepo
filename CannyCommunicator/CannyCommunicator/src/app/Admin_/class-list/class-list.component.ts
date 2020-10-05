import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { ReportsService } from 'src/app/Services/reports.service';
import * as XLSX from 'xlsx';  
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  public selectListYear: string;
  public selectListClass:string;
  public classes:any;
  public years:any;
  public date: Date;
  public classlist :any;
  public isresult :boolean;
  public button:any ;
  constructor(private service:ReportsService) { }
  @ViewChild('dateinput') dateref: NgModel;
  
  async ngOnInit()  
  {
    this.classes = await this.service.getclasses();
    this.years = await this.service.getyears();
this.button= document.getElementById("Download").hidden= true;
this.isresult=false;

  }

 async SubmitForm(){

this.classlist = await this.service.getclasslist(this.selectListClass,this.selectListYear);
if(this.classlist.length == 0){
this.isresult = true;
this.button= document.getElementById("Download").hidden= true;
}
if(this.classlist.length>0)
{
this.isresult=false;
this.button= document.getElementById("Download").hidden= false;}
console.log(this.classlist);
    
  }
  
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  Download() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'ClassList');  
    XLSX.writeFile(wb, 'ClassList.xlsx');  
  }  

    

  datevalidate(){
    //check if the date is larger than 1 january 2018
    if(this.dateref.control.value< '2018/01/01'){
      //if it isnt then we set an error we can access on the front end
      this.dateref.control.setErrors({'datelimit': true});
    }
  }
}
