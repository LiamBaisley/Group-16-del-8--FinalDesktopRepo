import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NewPackage } from 'src/app/Models/new-package';
import { Package } from 'src/app/Models/package';
import { AdminService } from 'src/app/Services/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-school-fee-package',
  templateUrl: './school-fee-package.component.html',
  styleUrls: ['./school-fee-package.component.scss']
})
export class SchoolFeePackageComponent implements OnInit {
  @ViewChild('SchoolFeeDate') dateref: NgModel;
  @ViewChild('SchoolFeeAmount') numref :NgModel;
  public SchoolFeeDateValue: Date;
  public SchoolFeeDescriptionValue: string;
  public SchoolFeeAmountValue: string;
  public FeesForTable;
  public Packages;
  public thisPackage: number;
  public newPackage: NewPackage = new NewPackage();
  constructor(
    private adminService: AdminService,
  ) { }

  async ngOnInit(){
    this.FeesForTable = await this.adminService.GetPackages();
    this.Packages = await this.adminService.GetPAckageNames();
    console.log("here");
    console.log(this.Packages);
  }

  ValidateDate(){
    let date = new Date();
    if(new Date(this.dateref.control.value) < date){
      this.dateref.control.setErrors({'datelimit': true});
    }
  }

  ValidateAmount(){
    if(this.numref.control.value<0){
      this.numref.control.setErrors({'min': true});
    }
    // if(this.numref.control.value>){
    //   this.numref.control.setErrors({'max': true});
    // }

    // if(!Number.isInteger(this.numref.control.value)){
      //if it isnt an integer then set an error we can check for on the html page
    //   this.numref.control.setErrors({'notinteger': true});
    // }

    if(this.countdecimals(this.numref.control.value)>2){
      this.numref.control.setErrors({'decimalOver': true});
    }
  }

  countdecimals(num: number): number{
    if(Math.floor(num) !== num){
      return num.toString().split(".")[1].length || 0;
    }
    return 0;
 }

 async submitForm(){
   this.newPackage.packageDate = new Date(this.dateref.control.value);
   console.log(this.newPackage);
   let button = document.getElementById("dismissModal");
   button.click();
   let response = await this.adminService.CreatePackage(this.newPackage);
   this.FeesForTable = await this.adminService.GetPackages();
 }

}
