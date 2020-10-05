import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { NgModel } from '@angular/forms';
import {ViewChild, ElementRef} from '@angular/core';
import { ReportsService } from 'src/app/Services/reports.service';
import { id } from 'date-fns/locale';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-events-list-report',
  templateUrl: './events-list-report.component.html',
  styleUrls: ['./events-list-report.component.scss']
})
export class EventsListReportComponent implements OnInit {
  public data:any;
  public startdate: Date;
  public enddate: Date;
  public tabledata:any;
  public chartdata:any;
  public total:number; 
  public isresult:boolean;
  chart =[];

  constructor(private service :ReportsService) { }
  @ViewChild('dateinput') dateref: NgModel;
  @ViewChild('dateinput2') dateref2: NgModel;
    @ViewChild('htmlData') htmlData:ElementRef;
  ngOnInit() {
 this.isresult = false;
    const button = document.getElementById("Download").hidden=true;
}
async GenerateReport(){
  this.data = await this.service.geteventlist(this.startdate,this.enddate);
  this.tabledata = this.data.TableData;
    let keys = this.data.ChartData.map(d=> d.EventName);
    let values = this.data.ChartData.map(d=> d.Attendance);

    this.chart = new Chart('canvas',{
      type: 'bar',
      data:{
        labels: keys,
        datasets:[
          {
            data: values,
            borderColour: '#3cba9f',
            fill: false,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        legend:{
          display: false
        },
        title: {
          display: true,
          text: 'Attendance of events'
        },
        scales: {
          xAxes: [{
            display: true,
            barPercentage: 0.75
          }],
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
              max: 100
            }
          }],
        }
      }
    }

    );
    const button = document.getElementById("Download").hidden=false;
    this.total=0;
    this.tabledata.forEach(element => {
      this.total += element.Attendance;
    });
    console.log(this.total);
    if(this.total == 0){
      this.isresult=true;
      const button = document.getElementById("Download").hidden=true;
    }
    if(this.total >0){
      this.isresult=false;
      const button = document.getElementById("Download").hidden=false;
    }
 
  }
async Download()
{
  this.data= await this.service.geteventlist(this.startdate,this.enddate);
  {
    var doc = new jsPDF();
    var pageheight= doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pagewidth= doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let  length = this.tabledata.length;
    let titles= this.data.ChartData.map(d=> d.EventName);

    let finalY= 200;
    var newcanvas=<HTMLCanvasElement>document.querySelector('#canvas');
    var newCanvasImg = newcanvas.toDataURL("image/png",1.0);
    doc.setFontSize(35)
    doc.text("Event Attendance",(pagewidth/2)-42,15);
    doc.addImage(newCanvasImg,'PNG',25,25,160,150);
    doc.setFontSize(14);
    for(let i=0; i<length;i++){
   
doc.text(titles[i],(pagewidth/2)-15,finalY-5); 

//doc.autoTable({startY:finalY,html: '#testing'+i,useCss:true,head:[
//['Child Name','Child Surname','Child Class']
//]})

//finalY=doc.autoTable.previous.finalY +35;
 
    }
//doc.autoTable({ html: '#htmlData'})
    doc.save('EventList.pdf')
  
}
}

  datevalidate(){
    //check if the date is larger than 1 january 2018
    if(this.dateref.control.value< '1990/01/01'){
      //if it isnt then we set an error we can access on the front end
      this.dateref.control.setErrors({'datelimit': true});
    }
    if(this.dateref2.control.value< '1990/01/01'){
      //if it isnt then we set an error we can access on the front end
      this.dateref2.control.setErrors({'datelimit': true});
    }
  }

}







