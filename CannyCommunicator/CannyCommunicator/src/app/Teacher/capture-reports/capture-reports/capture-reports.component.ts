import { Component, OnInit } from '@angular/core';
import { NgModel, NumberValueAccessor } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { ProgressReportService } from 'src/app/Services/progress-report.service';
import { ProgressReportResults } from 'src/app/Models/progress-report-results';
import { markTimeline } from 'console';

@Component({
  selector: 'app-capture-reports',
  templateUrl: './capture-reports.component.html',
  styleUrls: ['./capture-reports.component.scss']
})
export class CaptureReportsComponent implements OnInit {
date = Date.now();
public TextboxValue: string;
public Comment: string;
public Age: number;
public Weight:number;
public Height: number;
public Mark: number;
public MarkObtained: number;
public SelectListClasses:any;
public selectListValue:any;
public classes:any;
public children :any;
public reportinfo :any;
public Marks =[];
public currentresults:any =[];
public isresult :boolean;

public totalMark:number;
@ViewChild('NumInput') numref: NgModel;
@ViewChild('NumInput2') weightref: NgModel;
@ViewChild('NumInput3') heightref: NgModel;
@ViewChild('NumInput4') markref: NgModel;
@ViewChild('NumInput5') markfinref: NgModel;
@ViewChild('NumInputUpdate') unumref: NgModel;
@ViewChild('NumInput2Update') uweightref: NgModel;
@ViewChild('NumInput3Update') uheightref: NgModel;
@ViewChild('NumInput4Update') umarkref: NgModel;
@ViewChild('NumInput5Update') umarkfinref: NgModel;
  public types: any;
  public isclass: any;
  constructor( private service:ProgressReportService) { }

  async ngOnInit() {
this.classes = await this.service.getClasses();
this.MarkObtained =0;
this.totalMark =0;
this.types =await this.service.getTypes();
this.isresult = false;
  }

  
  async ViewClass(){
    this.children = await this.service.getChildrenInClass(this.SelectListClasses);
    if(this.children == null){
    this.isclass= true;
    }
    else 
    {
      this.isclass = false;
    }
   }
 async SubmitForm(){
 console.log(this.Marks);
 var ChildID= window.localStorage.getItem("ChildID");
 await this.service.CaptureReport(this.Marks, ChildID,this.SelectListClasses);
  }

  async  SetID(id)  
  {
    window.localStorage.setItem("ChildID",id);
    this.reportinfo = await this.service.getReportCriteria(this.SelectListClasses);
    this.Marks = [];
  }
 
Capture(ACCID,Mark:number) {
  //this.validate();
  var newres : ProgressReportResults = new ProgressReportResults;
  console.log(Mark);
  newres.mark = Mark;
  newres.ACID= ACCID;
 this.Marks.push(newres);
 this.totalMark = (this.totalMark*1)+ (Mark*1);
 console.log(this.totalMark);
 this.MarkObtained = (this.totalMark/(this.Marks.length*10)) * 100;
 console.log(this.Marks.length);
 console.log(this.MarkObtained)

}

async Update (){
  var ChildID= window.localStorage.getItem("ChildID");
  this.currentresults = await this.service.getCurrentReport(ChildID,this.selectListValue);
  if(this.currentresults.length == 0){
    this.isresult= true;
    console.log(this.currentresults);
   }
   else{
     this.isresult = false;
   }

}

  async UpdatedInfo() 
  {
    var ChildID= window.localStorage.getItem("ChildID");
    await this.service.UpdateReport(this.Marks,ChildID,this.SelectListClasses,this.selectListValue);
  }


  validate()
  {
    //check that the number is smaller than 6
    if(this.numref.control.value>6){
      //if it isnt then set an error that we can check for in the html file
      this.numref.control.setErrors({'min': true});
    }
    if(this.markref.control.value>11){
      //if it isnt then set an error that we can check for in the html file
      this.markref.control.setErrors({'min': true});
    }
    if(this.markfinref.control.value>11){
      //if it isnt then set an error that we can check for in the html file
      this.markfinref.control.setErrors({'min': true});
    }
    //this function checks that the number entered is smaller than 0
    if(this.numref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.numref.control.setErrors({'max': true});
    }
    if(this.markref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.markref.control.setErrors({'max': true});
    }
    if(this.markfinref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.markfinref.control.setErrors({'max': true});
    }
    if(this.weightref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.weightref.control.setErrors({'max': true});
    }

    if(this.heightref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.heightref.control.setErrors({'max': true});
    }


    //this can be used to check if a number is an innteger (in other words it may not have any decimal values!)
     if(!Number.isInteger(this.numref.control.value)){
      //if it isnt an integer then set an error we can check for on the html page
     this.numref.control.setErrors({'notinteger': true});
    }

    if(this.countdecimals(this.weightref.control.value)>2){
      //if it isnt then set an error that we can check for in the html file
      this.weightref.control.setErrors({'decimalOver': true});
    }
    if(this.countdecimals(this.heightref.control.value)>2){
      //if it isnt then set an error that we can check for in the html file
      this.heightref.control.setErrors({'decimalOver': true});
    }
  }

  Uvalidate(){
    //check that the number is smaller than 6
    if(this.unumref.control.value>6){
      //if it isnt then set an error that we can check for in the html file
      this.unumref.control.setErrors({'min': true});
    }
    if(this.umarkref.control.value>101){
      //if it isnt then set an error that we can check for in the html file
      this.umarkref.control.setErrors({'min': true});
    }
    
    if(this.umarkfinref.control.value>101){
      //if it isnt then set an error that we can check for in the html file
      this.umarkfinref.control.setErrors({'min': true});
    }
    //this function checks that the number entered is smaller than 0
    if(this.unumref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.unumref.control.setErrors({'max': true});
    }
    if(this.umarkref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.umarkref.control.setErrors({'max': true});
    }
    if(this.umarkfinref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.umarkfinref.control.setErrors({'max': true});
    }
    if(this.uweightref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.uweightref.control.setErrors({'max': true});
    }

    if(this.uheightref.control.value<0){
      //if it isnt then set an error that we can check for in the html file
      this.uheightref.control.setErrors({'max': true});
    }


    //this can be used to check if a number is an innteger (in other words it may not have any decimal values!)
     if(!Number.isInteger(this.unumref.control.value)){
      //if it isnt an integer then set an error we can check for on the html page
     this.unumref.control.setErrors({'notinteger': true});
    }

    if(this.countdecimals(this.uweightref.control.value)>2){
      //if it isnt then set an error that we can check for in the html file
      this.uweightref.control.setErrors({'decimalOver': true});
    }
    if(this.countdecimals(this.uheightref.control.value)>2){
      //if it isnt then set an error that we can check for in the html file
      this.uheightref.control.setErrors({'decimalOver': true});
    }
  }
//this is a function used to count the decimal places in a number
  countdecimals(num: number): number
  {
    if(Math.floor(num) !== num) 
    {
      return num.toString().split(".")[1].length || 0;
    }
    return 0;
  }
}
