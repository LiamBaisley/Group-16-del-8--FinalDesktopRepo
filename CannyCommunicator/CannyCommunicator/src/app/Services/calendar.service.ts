import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Event } from "../Models/event";
import { FileModel } from '../Models/file-model';

const URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public async GetEvents(){
    let result = await this.http.get<Event[]>(URL+"/ViewCalendar").toPromise();
    return result;
  }

  public async deleteEvent(ID: number){
    let result = this.http.delete(URL+"/DeleteEvent/"+ID).toPromise();
    return result;
  }

  public async UploadFile(file, ID: number){
    let result = await this.http.post(URL+"/UploadEventDocument/"+ID, file).toPromise();
    return result;
  }

  public async GetEventTypes(){
    let response = this.http.get(URL+"/GetEventTypes").toPromise();
    return response;
  }

  public async AddEvent(Event: Event){
    let response = await this.http.post<number>(URL+"/AddEvent", Event).toPromise();
    return response;
  }

  public async GetEvent(ID: number){
    let result =this.http.get<Event>(URL+"/GetEvent/"+ID).toPromise();
    return result;
  }

  public async GetUpdateFile(ID: number){

    let response = this.http.get<FileModel>(URL+"/GetDocument/"+ID).toPromise();
    return response;
  }

  public async UpdateEvent(newEvent: Event){
    let response = await this.http.post<number>(URL+"/UpdateEvent", newEvent).toPromise();
    return response;
  }

  public async UploadUpdateFile(file, ID: number){
    let result = await this.http.post(URL+"/UploadUpdateDocument/"+ID, file).toPromise();
    return result;
  }

  public async GetChildren(){
    let response = this.http.get(URL+"/GetChildren").toPromise();
    return response;
  }

  public async RespondToEvent(EventID: number, ChildIDs: number[]){
    let response = this.http.post(URL+"/RespondEvent/"+EventID, ChildIDs).toPromise();
    return response;
  }
}
