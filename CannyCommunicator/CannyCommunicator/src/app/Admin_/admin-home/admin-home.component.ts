import { Route } from '@angular/compiler/src/core';
import { Router} from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK, 
  CalendarMonthViewBeforeRenderEvent
} from 'angular-calendar';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { RouteConfigLoadStart } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CalendarService } from 'src/app/Services/calendar.service';
import { Event } from "../../Models/event";
import { FileModel } from 'src/app/Models/file-model';
import { buffer } from 'rxjs/operators';
import { Notice} from '../admin-home/Models/notice.model'
import { NoticeService } from '../admin-home/Services/notice.service';
import { AuthenticationServiceService } from 'src/app/Services/authentication-service.service'

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

//import '../node_modules/bootstrap/dist/css/bootstrap.css';
@Component({
  selector: 'app-admin-home',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  @ViewChild('EventAmount') numref :NgModel;
  @ViewChild('EventDate') dateref: NgModel;
  @ViewChild('EventDocument') EventDocRef: NgModel;
  @ViewChild('UpdateEventAmount') updatenumref :NgModel;
  @ViewChild('UpdateEventDate') updatedateref: NgModel;
  @ViewChild('UpdateEventDocument') updateEventDocRef: NgModel;
  @ViewChild('UpdateEventType') selectref;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public EventNameValue: string;
  public EventDescriptionValue: string;
  public EventAmountValue: number;
  public EventTypeValue: number;
  public EventDateValue: Date;
 
  public UpdateEventNameValue: string;
  public UpdateEventDescriptionValue: string;
  public UpdateEventAmountValue: number;
  public UpdateEventTypeValue: string;
  public UpdateEventDateValue: Date;
  public UpdateEventDocumentValue: File;

  public noticeheading;
  public noticelist;
  public noticemodel : Notice = new Notice ;
  public noticecontent;
  public noticeID;

  public EventDocumentValue: File;
  public EventFile: any;
  public myevents: Event[];
  public heading : string;
  public content : string;
  public viewDate: Date;
  public events: CalendarEvent[] = [];
  public deleteID: number;
  public EventTypes;
  public UpdateEventFile: FileModel = new FileModel();
  public thisEvent: Event = new Event();
  public newEvent: Event = new Event();
  refresh: Subject<any> = new Subject();

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;

  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Month;

  

  constructor(
    private modal: NgbModal, 
    private router:Router,
    private calendarService: CalendarService,
    private noticeservice: NoticeService,
    private logoutservice: AuthenticationServiceService,
    ){}




  ModalData: {
    ID: number;
    Title: string;
    Description: string;
    Date: Date;
  }

  async ngOnInit(){
    await this.getEvents();
    this.GetEventTypes();
    this.refresh.next();
  
   }


  //---------------------------------------Calendar specific methods----------------------------------------------------------//

  handleEvent(ID: number, Description: string, Date: Date, Title: string): void {
    this.ModalData = { ID, Title, Description, Date };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  getDetails(ID: number){
      var thisEvent = this.myevents.find(zz=> zz.ID === ID);
      this.GetEvent(ID);
      this.handleEvent(ID, thisEvent.Description, thisEvent.EventDate, thisEvent.EventName);
  }

  async assignEvents(){
    for(var i of this.myevents){
      this.events.push(
        {
          start: new Date(i.EventDate),
          end: new Date(i.EventDate),
          title: i.EventName,
          allDay: true,
          meta: i.ID,
        }
      );
    }
    this.refresh.next();
    this.viewDate = new Date();

    this.noticelist = await this.noticeservice.getnotices();
    console.log(this.noticelist);

  }

  Delete(ID: number)
  {
    console.log(ID);
    this.deleteID = ID;
    let button = document.getElementById("deleteConfirm");
    this.modal.dismissAll();
    button.click();
  }


  //-------------------------------------Get / Read methods ---------------------------------------------------------------//
 

  async getEvents(){
     this.myevents = await this.calendarService.GetEvents();
     console.log(this.myevents);
     await this.assignEvents();
  }

  async GetEventTypes(){
    this.EventTypes = await this.calendarService.GetEventTypes();
  }

  
  public async GetEvent(ID: number){
    console.log(ID);
    this.UpdateEventFile = new FileModel();
    this.thisEvent = await this.calendarService.GetEvent(ID);
    this.UpdateEventFile = await this.calendarService.GetUpdateFile(ID);
  }


  //----------------------------------Delete methods -----------------------------------------------------------------------//
  async DeleteEvent(){
    let response =await this.calendarService.deleteEvent(this.deleteID);
    this.events = [];
    await this.getEvents();
    this.refresh.next();
  }

  //---------------------------------On submit ----------------------------------------------------------------------------------//

  SubmitForm(){
    console.log(this.heading);
    console.log(this.content);
  }

  public async submitAdd(){
    console.log(this.newEvent.EventTypeID);
      let response = await this.calendarService.AddEvent(this.newEvent);
      if(response != null && this.EventFile != null){
        this.uploadFile(response);
      }
      var button = document.getElementById("dismissModal");
      button.click();
      this.events = [];
      await this.getEvents();
      this.refresh.next();
  }

  public async submitUpdate(){
    console.log("we updatin")
    let response = await this.calendarService.UpdateEvent(this.thisEvent);
    if (response != 0 && this.EventFile != null){
      this.uploadUpdateFile(response);
    }
    var button = document.getElementById("updateSuccess");
    button.click();
    this.events= [];
    await this.getEvents();
    this.refresh.next();
  }

//-------------------------------------------Validation section -------------------------------------------------------------------------//
  ValidateAmount(){
    if(this.numref.control.value<0){
      this.numref.control.setErrors({'min': true});
    }
    if(this.countdecimals(this.numref.control.value)>2){
      this.numref.control.setErrors({'decimalOver': true});
    }
  }

  ValidateDate(){
    let date = new Date();
    if(new Date(this.dateref.control.value) < date){
      this.dateref.control.setErrors({'datelimit': true});
    }
  }


  onFileChange(event){
    this.validateFile();
    this.EventFile = null;
    if(event.target.files && event.target.files.length >0){
      this.EventFile = event.target.files[0];
    }
  }

  UpdateFileChange(event){
    this.validateUpdateFile();
    this.EventFile = null;
    if(event.target.files && event.target.files.length >0){
      this.EventFile = event.target.files[0];
    }
  }

  public async uploadFile(ID: number){
    let file = new FileModel();
    file.filename = this.EventFile.name;
    file.filesize = this.EventFile.filesize;

    let reader = new FileReader();
    reader.onload = () => {
      file.fileasBase64 = reader.result.toString();
      let response = this.calendarService.UploadFile(file, ID);
      console.log(response);
    }
    reader.readAsDataURL(this.EventFile);
  }

  public async uploadUpdateFile(ID: number){
    let file = new FileModel();
    file.filename = this.EventFile.name;
    file.filesize = this.EventFile.filesize;
    file.DocumentID = this.UpdateEventFile.DocumentID;

    let reader = new FileReader();
    reader.onload = () => {
      file.fileasBase64 = reader.result.toString();
      let response = this.calendarService.UploadUpdateFile(file, ID);
      console.log(response);
    }
    reader.readAsDataURL(this.EventFile);
  }

  closeAndOpen(){
    this.modal.dismissAll();
    var button = document.getElementById("updateModal");
    button.click();
  }

  validateFile(){
    let path = this.EventDocRef.model;
    let patharray = path.split('/');
    let filename = patharray[patharray.length -1];
    let extension = filename.split('.').pop();
    if(extension != 'pdf'){
      this.EventDocRef.control.setErrors({'filetype': true});
    }
  }

  ValidateUpdateAmount(){
    if(this.numref.control.value<0){
      this.numref.control.setErrors({'min': true});
    }
    if(this.countdecimals(this.numref.control.value)>2){
      this.numref.control.setErrors({'decimalOver': true});
    }
  }

  ValidateUpdateDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let dateString = year+"/"+month+"/"+day;
    if(this.dateref.control.value < dateString){
      this.dateref.control.setErrors({'datelimit': true});
    }
  }
  validateUpdateFile(){
    let path = this.EventDocRef.model;
    let patharray = path.split('/');
    let filename = patharray[patharray.length -1];
    let extension = filename.split('.').pop();
    if(extension != 'pdf'){
      this.EventDocRef.control.setErrors({'filetype': true});
    }
  }

  countdecimals(num: number): number{
    if(Math.floor(num) !== num){
      return num.toString().split(".")[1].length || 0;
    }
    return 0;
 }

  log(x){
    console.log(x);
  }

  //--------------------------------------------------Create Notice--------------------------------------------------//
  async onsubmitaddnotice(){
    console.log(this.noticeheading,this.noticecontent);
    this.noticemodel.NoticeHeading = this.noticeheading;
    this.noticemodel.NoticeInformation = this.noticecontent;
    this.noticemodel.AdminID = 1
    console.log(this.noticemodel)
    await this.noticeservice.createnotice(this.noticemodel);   
    var button = document.getElementById("dismiss");
    button.click();
    this.refrechnotice();
  }

  //--------------------------------------------------Delete Notice--------------------------------------------------//
  getNoticeremoveID(id: number)
  {
    console.log(id);
    this.noticeID=id;
  }

  async removeNotice()
  {
    console.log(this.noticeID);
    this.noticeservice.removeNotice(this.noticeID)
  }
  //--------------------------------------------------Refrech--------------------------------------------------//
  async refrechnotice()
  {
    this.noticelist = await this.noticeservice.getnotices();
    console.log(this.noticelist);
  }

  public async logout()
  {
    this.logoutservice.logout();
  }
}

