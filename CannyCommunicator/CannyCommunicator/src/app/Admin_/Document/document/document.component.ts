import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { DoctypeService }from '../Services/doctype.service'
import { DocService }from '../Services/doc.service'
import { Documenttype } from '../Models/documenttype.model';
import { Document } from '../Models/document.model'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { File } from '../Models/file.model';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  
  public name : string;
  public tname : string;
  public document : string;

  @ViewChild('EventDocument') IDRef : NgModel;

  SubmitForm(){
    console.log(this.name);
    console.log(this.tname);
    console.log(this.document);
  }
  log(x){
    console.log(x);
  }

  constructor(private doctypeservice : DoctypeService, private docservice : DocService, private http:HttpClient, private router:Router) { }
  

  public dname : string;
  public uname : string;
  public tdescript : string;
  public utdescript : string;
  public tID : number;
  public documentfileValue: File;
  public doctypemodel: Documenttype = new Documenttype;
  public documentmodel: Document = new Document;
  public doctypelist:any;
  public documentlist:any = [];
  public documentfile: any =null;
  public documentFile: File;
  public docID : number;
  public utname : string;
  public file : any;
  public uID : number;
  public searchcriteria :string;

  //--------------------------------------------------Oninit--------------------------------------------------//
  async ngOnInit()
  {
    this.doctypelist = await this.doctypeservice.getdoctype();
    console.log(this.doctypelist);

    this.documentlist = await this.docservice.getDoc();
    console.log(this.documentlist);
  }

  //--------------------------------------------------Create--------------------------------------------------//
  async onsubmittype(){
  this.doctypemodel.Description = this.tdescript;
  console.log(this.tdescript);
  this.doctypeservice.createDocType(this.doctypemodel);
  let button = document.getElementById("dismiss")
  button.click();
  this.doctypelist = await this.doctypeservice.getdoctype();
  console.log(this.doctypelist);
  }

  async onsubmitdoc(){
    this.uploadfile();
    let button = document.getElementById("dismissT")
    button.click();
    this.documentlist = await this.docservice.getDoc();
    console.log(this.documentlist);
  }

  uploadfile(){
    let documentD : Document = new Document();
    documentD.Name= this.dname;
    documentD.DocumentTypeID = this.tID;
    let file = new File();
    file.filename = this.documentfile.name;
    file.filesize = this.documentfile.size;
    file.Name = this.dname;
    file.DocumentTypeID = this.tID;
    console.log(file);
    let reader = new FileReader();
    reader.onload= ()=>
    {
      file.fileasBase64=reader.result.toString();
      let resp = this.docservice.uploadfile(file);
      console.log(resp);
    }
    reader.readAsDataURL(this.documentfile);
  }

  //--------------------------------------------------Update--------------------------------------------------//
  async onsubmitDocumentUpdate(){
    this.documentmodel.DocumentID = this.uID
    this.documentmodel.Name = this.uname
    console.log(this.documentmodel)
    await this.docservice.updateupdatedoc(this.documentmodel , this.uID)
    this.documentlist = await this.docservice.getDoc();
    console.log(this.documentlist); 
    let button = document.getElementById("dismissU")
    button.click(); 
  }

  async Updatetype(ID , description : any){
    console.log(description)
    this.doctypemodel.Description = description;
    this.doctypemodel.DocumentTypeID = ID;
    console.log(this.doctypemodel);
    this.doctypeservice.updateDocType(ID,this.doctypemodel);
    this.doctypelist = await this.doctypeservice.getdoctype();
    console.log(this.doctypelist);
    this.documentlist = await this.docservice.getDoc();
    console.log(this.documentlist);  
  }

 //--------------------------------------------------Delete--------------------------------------------------// 
 async deleteDocument()
 {
   console.log(this.docID);
   var response = await this.docservice.removeDocument(this.docID);
   if(response != false){
   this.documentlist = await this.docservice.getDoc();
   console.log(this.documentlist);
   let button = document.getElementById("dismissD")
   button.click();
   let success = document.getElementById("DeleteSuccess")
   success.click();
   }
   else{
    let button = document.getElementById('ToggleModal');
    button.click();
   }
 }

 //--------------------------------------------------Utility--------------------------------------------------//
  validateFile(){
    let path = this.IDRef.model;
    let patharray = path.split('/');
    let filename = patharray[patharray.length -1];
    let extension = filename.split('.').pop();
    if(extension != 'pdf'){
      this.IDRef.control.setErrors({'filetype': true});
    }
  }

  async onSearch(){
    if (this.searchcriteria != null)
    {
    this.documentlist = await this.docservice.searchdoc(this.searchcriteria);
    if(this.documentlist.length == 0){
      this.documentlist = await this.docservice.getDoc();
      let button = document.getElementById('NotFound');
      button.click();
    }
    this.searchcriteria = null;
    }
    else
    {
      this.documentlist = await this.docservice.getDoc();
      console.log(this.documentlist);
    }
  }

  getDocumentID(id : number)
  {
    this.docID = id;
    console.log(id)
  }

  onFileChangeDoc(event){
    this.validateFile();
    this.documentFile = null
    if(event.target.files && event.target.files.length > 0){
      this.documentfile = event.target.files[0];
      console.log(this.documentfile);
    }
  }

  public async getDoc( ID : number)
  {
    console.log(ID);
    this.file = await this.docservice.getFile(ID);
    this.DownloadDocument();
  }

  public DownloadDocument()
  {
    let linkSource =`data:application/pdf;base64,${this.file.fileasBase64}`;
    console.log(linkSource);
    console.log(this.file.fileasBase64)
    let downloadLink = document.createElement("a");
    let fileName = this.file.fileName;
    console.log(this.file);
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  async updateteacher(name : string, ID: number)
  {
    this.uname = name;
    this.uID = ID
    console.log(this.uname,this.uID)
  }

  //--------------------------------------------------Refrech--------------------------------------------------//
  async refrechnotice()
  {
    this.doctypelist = await this.doctypeservice.getdoctype();
    console.log(this.doctypelist);

    this.documentlist = await this.docservice.getDoc();
    console.log(this.documentlist);
  }
}
