import { Component, OnInit } from '@angular/core';
import { NgModel, FormGroup } from '@angular/forms';
import { ViewChild , ElementRef} from '@angular/core';
import { ExtraMuralCompany } from '../../Models/extra-mural-company';
import { ExtraMuralCompanyServiceService } from '../../Services/extra-mural-company-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extramural-company',
  templateUrl: './extramural-company.component.html',
  styleUrls: ['./extramural-company.component.scss']
})
export class ExtramuralCompanyComponent implements OnInit {

  public companies : any;
  public CompanyName : string;
  public ContactNumber: string;
  public Email: string;
  public Address : string;
  public ID : any;
  public ExtraMuralCompany : ExtraMuralCompany = new ExtraMuralCompany;
  public oldCompany: any;
  public UpdateCompanyName : string;
  public UpdateContactNumber: string;
  public UpdateEmail: string;
  public UpdateAddress : string;
  public SelectListEM: any;
  public extramurals;

  constructor( private service : ExtraMuralCompanyServiceService , private http : HttpClient, 
    private router : Router, private route : ActivatedRoute  ) {
      
      }
     

  async ngOnInit() {
    this.companies = await this.service.GetExtramuralCompanies();
    this.extramurals = await this.service.GetExtramurals();
  }

  async SubmitForm(){
    this.ExtraMuralCompany.CompanyName = this.CompanyName;
    this.ExtraMuralCompany.ContactNumber = this.ContactNumber;
    this.ExtraMuralCompany.Email = this.Email;
    this.ExtraMuralCompany.Address = this.Address;
    this.ExtraMuralCompany.ExtramuralID = this.SelectListEM;
    await this.service.createExtraMuralCompany(this.ExtraMuralCompany);
    this.companies = await this.service.GetExtramuralCompanies();
    this.extramurals = await this.service.GetExtramurals();
  }

  async SubmitUpdateForm(){
    this.ID = window.localStorage.getItem("UpdateID");
    this.ExtraMuralCompany.ExtramuralCompanyID = this.ID;
    this.ExtraMuralCompany.CompanyName =this.UpdateCompanyName;
    this.ExtraMuralCompany.ContactNumber = this.UpdateContactNumber;
    this.ExtraMuralCompany.Email = this.UpdateEmail;
    this.ExtraMuralCompany.Address = this.UpdateAddress;
    this.ExtraMuralCompany.ExtramuralID = this.SelectListEM;
    await this.service.updateExtraMuralCompany(this.ID , this.ExtraMuralCompany);
    this.companies = await this.service.GetExtramuralCompanies();
    this.extramurals = await this.service.GetExtramurals();;
  }

  async UpdateCompany(id){
    this.oldCompany = await this.service.getExtramuralCompany(id);
    console.log(this.oldCompany);
    this.UpdateCompanyName = this.oldCompany.CompanyName;
    this.UpdateContactNumber = this.oldCompany.ContactNumber;
    this.UpdateEmail = this.oldCompany.Email;
    this.UpdateAddress = this.oldCompany.Address;
    this.SelectListEM = this.oldCompany.ExtramuralID;
    window.localStorage.setItem("UpdateID" ,id);
  }

  log(x){
    console.log(x);
  }

  DeleteCompany(id){
    window.localStorage.setItem("DeleteID" , id)
    console.log(id);
  }

  async deleteConfirm(){
    this.ID = window.localStorage.getItem("DeleteID");
    let response =await this.service.deleteExtraMuralCompany(this.ID);
    if(response == true){
      this.companies = await this.service.GetExtramuralCompanies();
      this.extramurals = await this.service.GetExtramurals();
      let button = document.getElementById('GoDelete');
      button.click();
    }
    else{
      let button = document.getElementById('NoDelete');
      button.click();
    }
  }

}
