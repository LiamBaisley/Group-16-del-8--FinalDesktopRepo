import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ReportsService } from 'src/app/Services/reports.service';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthenticationServiceService } from 'src/app/Services/authentication-service.service';

@Component({
  selector: 'app-class-list-teacher',
  templateUrl: './class-list-teacher.component.html',
  styleUrls: ['./class-list-teacher.component.scss']
})
export class ClassListTeacherComponent implements OnInit {
  public Children: any;
  public isresult: boolean;
  constructor(private reportService: ReportsService,
    private authService: AuthenticationServiceService ) {}

  async ngOnInit(){
    let token = localStorage.getItem("token");
    let decodedToken: any = jwt_decode(token);
    let ID: number = Number(decodedToken.ID)
    this.Children = await this.reportService.getTeacherClass(ID);
    if(this.Children.length > 0){
      this.isresult = true;
    }
    else{
      this.isresult = false;
    }
  }

  Download(){
    let DATA = document.getElementById('ResultsTable');
    html2canvas(DATA).then(canvas =>{
      let doc = new jsPDF('p', 'pt', 'a4');
      var width = doc.internal.pageSize.getWidth();
      var height = 295;
      var imgHeight = canvas.height * width/canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('img/png');
      var position = 0;

      doc.addImage(contentDataURL, 'PNG', 0, position, width, imgHeight);
      doc.save("ClassList.pdf");
    });
  }

  logout(){
    this.authService.logout();
  }

}
