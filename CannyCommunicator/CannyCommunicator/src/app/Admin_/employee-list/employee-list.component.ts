import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SupportStaffServiceService } from './Services/support-staff-service.service';
import { TeacherServiceService } from './Services/teacher-service.service';
import { SupportStaff } from './Models/support-staff.model';
import { Teachers } from './Models/teachers.model'
import { Button } from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private supportstaffservice : SupportStaffServiceService, private teacherservice : TeacherServiceService) { }
  public name : string;
  public surname : string;
  public ClassVlaue : number;
  public number : string;
  public email : string;
  public uname : string;
  public usurname : string;
  public uClassVlaue : string;
  public unumber : string;
  public uemail : string;
  public sname : string;
  public ssurname : string;
  public srole : number;
  public snumber : string;
  public supportStaffID :number;
  public usname : string;
  public ussurname : string;
  public usrole : number;
  public usnumber : string;
  public supportstafflist:any;
  public supportstaftype:any;
  public teacherlist:any;
  public classlist:any;
  public supportstaff: SupportStaff = new SupportStaff;
  public teacher: Teachers = new Teachers;
  public suppID :number = 0;
  public teacherID :number = 0;
  public uClassID : number;

  log(x){
    console.log(x);
  }
  
  //--------------------------------------------------Oninit--------------------------------------------------//
  async ngOnInit(){
    this.supportstafflist = await this.supportstaffservice.getsupportstaff();
    console.log(this.supportstafflist);

    this.supportstaftype = await this.supportstaffservice.getsupportstaffType();
    console.log(this.supportstaftype);

    this.teacherlist = await this.teacherservice.getteacher();
    console.log(this.teacherlist);

    this.classlist = await this.teacherservice.getClass();
    console.log(this.classlist);
  }

  //--------------------------------------------------Create--------------------------------------------------//
  onsubmitTeacher(){
    this.teacher.Name = this.name;
    this.teacher.Surname = this.surname;
    this.teacher.ContactNumber = this.number;
    this.teacher.EmailAddress = this.email;
    this.teacher.ClassID = this.ClassVlaue;
    console.log(this.teacher);
    console.log(this.ClassVlaue);
    this.teacherservice.createTeacher(this.teacher)
    let button = document.getElementById("dismissAT")
    button.click();
  }

  onsubmitstaff(){
    this.supportstaff.Name = this.sname;
    this.supportstaff.Surname = this.ssurname;
    this.supportstaff.EmployeeTypeID = this.srole;
    this.supportstaff.ContactNumber = this.snumber;
    console.log(this.supportstaff);
    this.supportstaffservice.createSupportStaff(this.supportstaff);
    this.ngOnInit();
    let button = document.getElementById("dismissAS");
    button.click();
  }

  //--------------------------------------------------Update--------------------------------------------------//
  onsubmitstaffupdate(){
    this.supportstaff.Name=this.usname;
    this.supportstaff.Surname=this.ussurname;
    this.supportstaff.EmployeeTypeID=this.usrole;
    this.supportstaff.ContactNumber=this.usnumber;
    console.log(this.supportstaff,this.supportStaffID);
    this.supportstaffservice.UpdateSupportStaff(this.supportStaffID,this.supportstaff)
    let button = document.getElementById("dismissUS");
    button.click();

  }

  async onupdateSupport(name:string,surname:string,role:number,Cnumber:string,ID:number){
    this.usname = name;
    this.ussurname = surname;
    this.usrole = role;
    console.log(this.usrole)
    this.usnumber = Cnumber;
    this.supportStaffID = ID;
    console.log(this.supportStaffID)

  }

  async updateteacher(teachersEmail : string, teachername:string, teachercontactnumber : string, teachersurname : string, ID:number )
  {
    this.uemail = teachersEmail;
    this.uname = teachername;
    this.unumber = teachercontactnumber;
    this.usurname = teachersurname;
    this.teacherID = ID;
    console.log(teachercontactnumber)
  }

  async onsubmitTeacherUpdate(){
   this.teacher.Name = this.uname;
   this.teacher.Surname = this.usurname;
   this.teacher.ClassID = this.uClassID;
   this.teacher.ContactNumber = this.unumber;
   this.teacher.EmailAddress = this.uemail;
   console.log(this.teacher,this.teacherID)
   this.teacherservice.updateTeacher(this.teacherID, this.teacher)
   let button = document.getElementById("dismissUT");
   button.click();
  }

  //--------------------------------------------------Delete--------------------------------------------------//
  getSuppremoveID(id: number)
  {
    console.log(id);
    this.suppID=id;
  }

  getTeacherID(id: number)
  {
    console.log(id);
    this.teacherID=id;
  }

  async removeSupport()
  {
    console.log(this.suppID);
    this.supportstaffservice.removeSupportStaff(this.suppID);
    let button = document.getElementById("dismissDS");
    button.click();
  }
  async removeTeacher()
  {
    console.log(this.teacherID);
    this.teacherservice.removeTeacher(this.teacherID);
    
    this.teacherlist = await this.teacherservice.getteacher();
    console.log(this.teacherlist);

    this.classlist = await this.teacherservice.getClass();
    console.log(this.classlist);

    let button = document.getElementById("dismissDT");
    button.click();
  }

  //--------------------------------------------------Refrech--------------------------------------------------//
  async refrech()
  {
    this.supportstafflist = await this.supportstaffservice.getsupportstaff();
    console.log(this.supportstafflist);

    this.supportstaftype = await this.supportstaffservice.getsupportstaffType();
    console.log(this.supportstaftype);

    this.teacherlist = await this.teacherservice.getteacher();
    console.log(this.teacherlist);

    this.classlist = await this.teacherservice.getClass();
    console.log(this.classlist);
  }

  submitHandelerT(addTeacherForm){
    console.log(addTeacherForm);
    console.log('Value is', addTeacherForm.value)
  }
  submitHandelerS(addSupportStaffForm){
    console.log('Value is', addSupportStaffForm.value)
  }
}
