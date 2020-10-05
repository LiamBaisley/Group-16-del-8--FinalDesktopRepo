import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {EmployeeReportService} from 'src/app/Admin_/employee-list-report/Services/employee-report.service'
import {EmployeeReport} from './Models/employee-report.model'
import * as XLSX from 'xlsx'
; 
@Component({
  selector: 'app-employee-list-report',
  templateUrl: './employee-list-report.component.html',
  styleUrls: ['./employee-list-report.component.scss']
})
export class EmployeeListReportComponent implements OnInit {

  constructor(private emploeereportservice : EmployeeReportService) { }

  public employeelist : any;
  public employees : EmployeeReport = new EmployeeReport;

  async ngOnInit(){
    this.employeelist = await this.emploeereportservice.getEmployees();
    console.log(this.employeelist);
    this.employees = this.employeelist;
    console.log(this.employees);
  }

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'EmployeeList.xlsx');  
  }  
  team: any = [{  
    Sno: 1,  
    Team: 'India',  
    Match: 8,  
    Win: 7,  
    Loss: 0,  
    Cancel: 1,  
    Point: 15  
  
  }, {  
    Sno: 2,  
    Team: 'NewZeland',  
    Match: 8,  
    Win: 6,  
    Loss: 1,  
    Cancel: 1,  
    Point: 13  
  
  },  
  {  
    Sno: '3',  
    Team: 'Aus',  
    Match: 8,  
    Win: 6,  
    Loss: 1,  
    Cancel: 1,  
    Point: 13  
  
  },  
  {  
    Sno: '4',  
    Team: 'England',  
    Match: 8,  
    Win: 5,  
    Loss: 2,  
    Cancel: 1,  
    Point: 11  
  },  
  {  
    Sno: '5',  
    Team: 'S.Africa',  
    Match: 8,  
    Win: 4,  
    Loss: 3,  
    Cancel: 1,  
    Point: 9  
  },  
  {  
    Sno: '6',  
    Team: 'Pak',  
    Match: 8,  
    Win: 4,  
    Loss: 4,  
    Cancel: 1,  
    Point: 9  
  
  },  
  {  
    Sno: '7',  
    Team: 'SriLanka',  
    Match: 8,  
    Win: 3,  
    Loss: 3,  
    Cancel: 2,  
    Point: 8  
  
  },  
  {  
    Sno: '8',  
    Team: 'Bdesh',  
    Match: 8,  
    Win: 2,  
    Loss: 4,  
    Cancel: 2,  
    Point: 6  
  
  }  
  ];  

}
