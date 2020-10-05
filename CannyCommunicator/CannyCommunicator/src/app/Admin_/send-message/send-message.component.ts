import { Component, OnInit } from '@angular/core';
import { ClassesService } from './Services/classes.service';
import { PupilsService } from './Services/pupils.service';
import { SendmessageService } from './Services/sendmessage.service'
import {Classes} from './Model/classes.model';
import {Pupils} from './Model/pupils.model';
import { Message } from './Model/message.model'
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  constructor(private classservice : ClassesService, private pupilservice : PupilsService, private sendmessageservice : SendmessageService) { }

  public cmessage : string;
  public pmessage : string;
  public classlist : any;
  public pupillist : any;
  public recipientclist : Array<number> =[];
  public recipientplist : Array<number> =[];
  public rID : number = null;
  public isDisabledp: boolean = true;
  public isDisabledc: boolean = true;
  public text : string = null;
  public isAdmin: boolean;
  public message : Message = new Message;
  public searchcriteria :string;

  log(x){
    console.log(x);
  }

  async ngOnInit(){
    let token = localStorage.getItem("token");
    let decodedToken: any = jwt_decode(token);
    if(decodedToken.UserType.toUpperCase() == 'ADMIN'){
      this.isAdmin == true;
    }
    else{
      this.isAdmin == false;
    }
    console.log("shit");
    this.classlist = await this.classservice.getclasses();
    console.log(this.classlist);

    this.pupillist = await this.pupilservice.getpupils();
    console.log(this.pupillist);

  }

  async onSearch(){
    if (this.searchcriteria != null)
    {
    
    this.pupillist = await this.pupilservice.searchpupil(this.searchcriteria);
    this.searchcriteria = null;
    console.log(this.searchcriteria)
    console.log(this.pupillist);
    }
    else
    {
      this.pupillist = await this.pupilservice.getpupils();
      console.log(this.pupillist);
    }
  }

  public getrecipientclist(ID : number)
  {
    var a = this.recipientclist.indexOf(ID);
    console.log(a)
    this.rID = ID;
    if(a<0)
    {
      this.recipientclist.push(this.rID)
    }
    else
    {
      this.recipientclist.splice(a,1)
    }
    console.log(this.recipientclist)
  }

  public getrecipientplist(ID : number)
  {
    var a = this.recipientplist.indexOf(ID);
    console.log(a)
    this.rID = ID;
    if(a<0)
    {
      this.recipientplist.push(this.rID)
    }
    else
    {
      this.recipientplist.slice(a,1)
    }
    console.log(this.recipientplist)
  }

  async onSendMessage(){
    if(this.pmessage != null)
    {
      this.message.recipients = this.recipientplist;
      this.message.mailcontent= this.pmessage;
      this.sendmessageservice.sendMessageparent(this.message)
    }
    else if(this.cmessage != null)
    {
      this.message.recipients = this.recipientclist;
      this.message.mailcontent = this.cmessage;
      this.sendmessageservice.sendMessageclass(this.message)
    }
  }
}
