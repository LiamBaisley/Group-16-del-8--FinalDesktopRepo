import { Injectable } from '@angular/core';
import { Notice } from '../Models/notice.model';
import { HttpClient } from '@angular/common/http';

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor( private http: HttpClient ) { }
  

  public async createnotice(noticeinfo : Notice){
    let response = await this.http.post(URL+'/Notices', noticeinfo).toPromise();
    return response;
  }

  public async getnotices(){
    let response = await this.http.get(URL+'/Notices').toPromise();
    return response;
  }
  
  
  public async removeNotice(id : number)
  {
    let response = await this.http.delete(URL+'/Notices/'+id).toPromise();
    return response;
  }
  
}
