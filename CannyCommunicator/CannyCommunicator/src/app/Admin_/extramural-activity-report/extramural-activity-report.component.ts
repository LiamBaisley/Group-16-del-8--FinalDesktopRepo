import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import jspdf from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-extramural-activity-report',
  templateUrl: './extramural-activity-report.component.html',
  styleUrls: ['./extramural-activity-report.component.scss']
})
export class ExtramuralActivityReportComponent implements OnInit {
  public selectListValue: number;
  public Extramurals = {} as any;
  public reportData = {} as any;
  public gotData: boolean = false;
  @ViewChild('Report') downloadData: ElementRef;
  constructor(
    private adminService: AdminService,
  ) { }

  async ngOnInit(){
    this.Extramurals = await this.adminService.GetExtramuralDetails();
    console.log(this.Extramurals);
  }
  
  async SubmitForm(){
    console.log(this.selectListValue);
    this.reportData = await this.adminService.GenerateExtramuralReport(Number(this.selectListValue));
    console.log(this.reportData);
    this.gotData = true;
  }

  downloadReport(){
      const WS: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.downloadData.nativeElement);
      const WB: XLSX.WorkBook = XLSX.utils.book_new();
      const workbookName = "ExtramuralReport.xlsx";
      XLSX.utils.book_append_sheet(WB, WS, "Sheet1");
      XLSX.writeFile(WB, workbookName);
  }

}
