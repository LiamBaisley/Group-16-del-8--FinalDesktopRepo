import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { ApplicationsService } from 'src/app/Services/applications.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  public selectListValue: any;
public abc;
public ID:any;
public class:any;
  constructor(private router: Router,private service:ApplicationsService) { 
}

  async SubmitForm(status){
    this.ID = window.localStorage.getItem("ViewApplication");
    if(status=="Accepted") 
 await this.service.Assign(this.ID,this.selectListValue);

 await this.service.AcceptOrReject(this.ID,status)
  }
  async ngOnInit() {
    this.ID = window.localStorage.getItem("ViewApplication");
    this.abc=  await this.service.getApplicationID(this.ID);
    console.log(this.abc)
  this.abc = Array.of(this.abc);
  this.class =  await this.service.getClasses();

  }

 async Status(stat){
  this.ID = window.localStorage.getItem("ViewApplication");
    await this.service.AcceptOrReject(this.ID,stat)
  }
  BacktoHome(){
   this.router.navigate(['/ApplicationsList']);
  }

}
