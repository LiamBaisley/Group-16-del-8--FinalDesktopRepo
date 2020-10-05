import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/Admin_/send-message/Model/message.model'

const URL = "https://localhost:44302/api"

@Injectable({
  providedIn: 'root'
})
export class SendmessageService {

  constructor(private http  :HttpClient) { }

  public async sendMessageparent( message : Message){
    let response = await this.http.post(URL+'/sendMessageParent',message ).toPromise();
    return response;
  }

  public async sendMessageclass( message : Message)
  {
    let response = await this.http.post(URL+'/SendMessageClass',message ).toPromise();
    return response;
  } 
}
