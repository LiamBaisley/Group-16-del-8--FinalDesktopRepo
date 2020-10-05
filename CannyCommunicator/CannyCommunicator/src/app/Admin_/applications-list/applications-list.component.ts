import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationsService } from 'src/app/Services/applications.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  public abc:any;
  public New:any;;
  public WaitingList:any;
 public isresult:boolean;
public grades:any;
  constructor(private service:ApplicationsService, private router:Router) { }

 async ngOnInit(){
    console.log("hit");
    this.abc=  await this.service.getapplications();
    console.log(this.abc);
    this.grades = await this.service.getGrades();
  }
 async SubmitForm(type:string){
    if(type == "New")
    this.abc=  await this.service.getapplications();
 else if(type == "WaitingList")
 this.abc = await this.service.getWaitingList();
 if(this.abc == null)
  this.isresult = true;
 else 
 this.isresult= false;
 
  }
  ViewDetails(id){
    
    console.log(id);
    window.localStorage.setItem("ViewApplication", id.toString());
      this.router.navigateByUrl('Applications');}
  

}
