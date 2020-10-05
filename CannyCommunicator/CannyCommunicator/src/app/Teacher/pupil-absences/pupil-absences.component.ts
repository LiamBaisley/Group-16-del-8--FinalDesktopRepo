import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { AbsencesService } from 'src/app/Services/absences.service';
import { stat } from 'fs';

@Component({
  selector: 'app-pupil-absences',
  templateUrl: './pupil-absences.component.html',
  styleUrls: ['./pupil-absences.component.scss']
})
export class PupilAbsencesComponent implements OnInit {
  public Reason: string;
  public SelectListClasses:any;
  public classes:any;
  public children:any;
  public stats:any;
  public curren:any;
  public AbsentID:any;
  public CCYID:any;
  public isresult:boolean;
  constructor(private service:AbsencesService) { }

 async ngOnInit(){
   this.classes = await this.service.getClasses();
  }

  async ViewClass(num){
    if(num == 1)
    {
    this.stats = "Normal"
    this.children = await this.service.getChildren(this.SelectListClasses);}
    if(num == 2){
    this.stats = "Absent"
    this.children = await this.service.getAbsentChildren(this.SelectListClasses);
  }
  if(this.children==null)
  this.isresult= true;
  else if(this.children != null)
  this.isresult= false; 
  }
 async MarkPresent(id){
    await this.service.MarkPresent(id);
    this.children = await this.service.getAbsentChildren(this.SelectListClasses);
  }
  MarkAbsent(id){
   window.localStorage.setItem("CCYID",id);
  }

 async UpdateAbsentID(id){
    window.localStorage.setItem("AbsentID",id)
    this.curren= await this.service.GetByID(id);
    this.Reason = this.curren.Reason;
  }
async  SubmitForm(){
  this.CCYID = window.localStorage.getItem("CCYID");
  await this.service.MarkAbsent(this.CCYID,this.Reason);
  }

  async Update(){
    this.AbsentID = window.localStorage.getItem("AbsentID");
    await this.service.UpdateAbsnece(this.AbsentID,this.Reason);
  }

}
