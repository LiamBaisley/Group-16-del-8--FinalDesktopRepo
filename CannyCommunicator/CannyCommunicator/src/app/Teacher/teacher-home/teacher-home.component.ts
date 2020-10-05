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
  DAYS_OF_WEEK 
} from 'angular-calendar';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { RouteConfigLoadStart, Router} from '@angular/router';
import { CalendarService } from 'src/app/Services/calendar.service';
import { Event } from "../../Models/event";
import { FileModel } from 'src/app/Models/file-model';
import { AuthenticationServiceService } from 'src/app/Services/authentication-service.service';

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

@Component({
  selector: 'app-teacher-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  public events: CalendarEvent[] = [];
  public refresh: Subject<any> = new Subject();
  public viewDate: Date;
  public myevents: Event[];
  public thisEvent: Event = new Event();
  public EventFile: FileModel = new FileModel();
  ModalData: {
    ID: number;
    Title: string;
    Description: string;
    Date: Date;
  }

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  CalendarView = CalendarView;

  constructor(private modal: NgbModal,
              private router: Router,
              private calendarService: CalendarService,
              private logoutservice: AuthenticationServiceService,
    ){}

    handleEvent(ID: number, Description: string, Date: Date, Title: string): void {
      this.ModalData = { ID, Title, Description, Date };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    getDetails(ID: number){
        var thisEvent = this.myevents.find(zz=> zz.ID === ID);
        this.GetEvent(ID);
        this.handleEvent(ID, thisEvent.Description, thisEvent.EventDate, thisEvent.EventName);
    }

    public async GetEvent(ID: number){
      console.log(ID);
      this.thisEvent = await this.calendarService.GetEvent(ID);
      this.EventFile = await this.calendarService.GetUpdateFile(ID);
    }

    public DownloadDocument(){
      let linkSource = `data:application/pdf;base64,${this.EventFile.fileasBase64}`;
      let downloadLink = document.createElement("a");
      let filename = this.EventFile.filename;
      console.log(this.EventFile);
  
      downloadLink.href = linkSource;
      downloadLink.download = filename;
      downloadLink.click();
    }


 async ngOnInit(){
      await this.getEvents();
      this.refresh.next();
  }

  async getEvents(){
    this.myevents = await this.calendarService.GetEvents();
    await this.assignEvents();
  }

  assignEvents(){
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
  }
  public async logout()
  {
    this.logoutservice.logout();
  }

}

