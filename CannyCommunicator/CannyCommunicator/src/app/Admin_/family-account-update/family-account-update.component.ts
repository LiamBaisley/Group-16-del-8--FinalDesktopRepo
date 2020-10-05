import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RegistrationModel } from 'src/app/Models/registration-model';
import { UpdateParentModel } from 'src/app/Models/update-parent-model';
import { Parent } from 'src/app/Models/parent';
import { ParentServiceService } from 'src/app/Services/parent-service.service';
import { NgModel } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/Services/authentication-service.service';
import { FileModel } from 'src/app/Models/file-model';
import { Vaccine } from 'src/app/Models/vaccine';
import { InfectiousDisease } from 'src/app/Models/infectious-disease';
import { Allergy } from 'src/app/Models/allergy';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-family-account-update',
  templateUrl: './family-account-update.component.html',
  styleUrls: ['./family-account-update.component.scss']
})
export class FamilyAccountUpdateComponent implements OnInit {
  //Parent Model attributes
  public childID: number;
  public NumKids: number;
  
  public RegistrationModel: RegistrationModel = new RegistrationModel();
   public IDFileMotherValue: File;
   public IDFileFatherValue: File;
   public DateToday: Date = new Date();
  
  public RegPageInfo = {} as any;
  public IDMother: any = null;
  public IDFather: any = null;
  public MedicalLiabilityValue: boolean;
  public noMedAid: boolean;
  public children;
  public DOB: Date;
  public detailsForUpdate: UpdateParentModel = new UpdateParentModel();
  public allergyCheck:boolean[] = [];
  public vaccineCheck:boolean[] = [];
  public diseaseCheck:boolean[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private parentService: ParentServiceService,
    private authenticationService: AuthenticationServiceService,
    private adminService: AdminService
  ) { }

  @ViewChild('IDFileMother') IDRefMother: NgModel;
  @ViewChild('IDFileFather') IDRefFather: NgModel;
  @ViewChild('DOBChild') dateref: NgModel;

 async ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.childID = Number(params.get("ID"));
    });
    this.GetInfo();
  }

  validateFileMother(){
    let path = this.IDRefMother.model;
    let patharray = path.split('/');
    let filename = patharray[patharray.length -1];
    let extension = filename.split('.').pop();
    if(extension != 'pdf'){
      this.IDRefMother.control.setErrors({'filetype': true});
    }
    
  }
  validateFileFather(){
    let path = this.IDRefFather.model;
    let patharray = path.split('/');
    let filename = patharray[patharray.length -1];
    let extension = filename.split('.').pop();
    if(extension != 'pdf'){
      this.IDRefFather.control.setErrors({'filetype': true});
    }
  }

  onFileChangeMother(event){
    this.validateFileMother();
    this.IDMother = null;
    if(event.target.files && event.target.files.length > 0){
      this.IDMother = event.target.files[0];      
    }
  }

  ValidateDate(){
    let date = new Date();
    let year = date.getFullYear()-7;
    let submittedDate = <Date>this.dateref.control.value;
    date.setFullYear(year,1,1);
    let compareDate = new Date(submittedDate);
    // compareDate.setFullYear(submittedDate.year, submittedDate.month, submittedDate.day);
    // console.log(compareDate);
    if(compareDate <= date){
      this.dateref.control.setErrors({'datelimit': true});
    }
    else{
      this.detailsForUpdate.newChild.DateOfBirth = compareDate;
    }
  }

  onFileChangeFather(event){
    this.validateFileFather();
    this.IDFather = null;
    if(event.target.files && event.target.files.length>0){
      this.IDFather = event.target.files[0];
    }
  }

  public async uploadMother(ID: number){
    let file = new FileModel();
    file.filename = this.IDMother.name;
    file.filesize = this.IDMother.size;

    let reader = new FileReader();
    reader.onload = () => {
      file.fileasBase64 = reader.result.toString();
      let resp =  this.parentService.UploadFile(file, ID);
    }

    reader.readAsDataURL(this.IDMother);
  }

  public async uploadFather(ID: number){
    let file = new FileModel();
    file.filename = this.IDFather.name;
    file.filesize = this.IDFather.size;

    let reader = new FileReader();
    reader.onload = () => {
      file.fileasBase64 = reader.result.toString();
      let resp =  this.parentService.UploadFile(file, ID);
    }

    reader.readAsDataURL(this.IDFather);
  }

  async GetInfo(){
    this.detailsForUpdate = await this.adminService.getFamilyDetails(this.childID);
    console.log(this.detailsForUpdate);
    this.RegPageInfo = await this.authenticationService.GetRegPageInfo();
    this.DOB = new Date(this.detailsForUpdate.newChild.DateOfBirth);
    this.checkMedicalInfo();
    let button = document.getElementById("dismissModal");
    button.click();
  }

  checkMedicalInfo(){
    for(var vaccine of this.RegPageInfo.Vaccines){
      if(this.detailsForUpdate.Vaccines.find(zz=>zz.VaccineID === vaccine.VaccineID)){
        this.vaccineCheck.push(true);
      }
      else{
        this.vaccineCheck.push(false);
      }
    }

    for(var allergy of this.RegPageInfo.Allergies){
      if(this.detailsForUpdate.Allergies.find(zz=>zz.AllergyID === allergy.AllergyID)){
        this.allergyCheck.push(true);
      }
      else{
        this.allergyCheck.push(false);
      }
    }

    for(var infectiousDisease of this.RegPageInfo.InfectiousDiseases){
      if(this.detailsForUpdate.InfectiousDiseases.find(zz=>zz.InfectiousDiseaseID === infectiousDisease.InfectiousDiseaseID)){
        this.diseaseCheck.push(true);
      }
      else{
        this.diseaseCheck.push(false);
      }
    }

    if(this.detailsForUpdate.medAid == null){
      this.noMedAid = true;
    }
  }


  addRemoveVaccines(Vaccine: Vaccine){
    if(!this.detailsForUpdate.Vaccines.find(zz => zz.VaccineID == Vaccine.VaccineID)){
      this.detailsForUpdate.Vaccines.push(Vaccine);
    }
    else{
      let index = this.detailsForUpdate.Vaccines.findIndex(zz=> zz.VaccineID == Vaccine.VaccineID);
      this.detailsForUpdate.Vaccines.splice(index,1);
    }
  }

  addRemoveDisease(Disease: InfectiousDisease){
    if(!this.detailsForUpdate.InfectiousDiseases.find(zz => zz.InfectiousDiseaseID == Disease.InfectiousDiseaseID)){
      this.detailsForUpdate.InfectiousDiseases.push(Disease);
    }
    else{
      let index = this.detailsForUpdate.InfectiousDiseases.findIndex(zz=> zz.InfectiousDiseaseID == Disease.InfectiousDiseaseID);
      this.detailsForUpdate.InfectiousDiseases.splice(index,1);
    }
  }

  addRemoveAllergy(Allergy: Allergy){
    if(!this.detailsForUpdate.Allergies.find(zz => zz.AllergyID == Allergy.AllergyID)){
      this.detailsForUpdate.Allergies.push(Allergy);
    }
    else{
      let index = this.detailsForUpdate.Allergies.findIndex(zz=> zz.AllergyID == Allergy.AllergyID);
      this.detailsForUpdate.Allergies.splice(index,1);
    }
  }


  async SubmitThisForm(){
    var response;
    console.log("submitted");
    response = this.adminService.updateFamily(this.childID, this.detailsForUpdate);
    console.log(response);
    response.then(value => {
      if(this.IDFather != null){
      this.uploadFather(response.Parent1);
      }

      if(this.IDMother != null){
      this.uploadMother(response.Parent2);
      }

      let button = document.getElementById('updateSuccess');
      button.click();
    });
  }

}
