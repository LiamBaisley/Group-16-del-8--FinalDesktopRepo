import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { AllocateDuty } from 'src/app/Models/allocate-duty';

@Component({
  selector: 'app-allocate-employee-duty',
  templateUrl: './allocate-employee-duty.component.html',
  styleUrls: ['./allocate-employee-duty.component.scss']
})
export class AllocateEmployeeDutyComponent implements OnInit {
  public DaySelectValue: number;
  public DutySelectValue: number;
  public TeacherSelectValue: number;
  public info = {} as any;
  public result = {} as any;
  constructor(
    private adminService: AdminService
  ) { }

  async ngOnInit(){
    this.result = await this.adminService.getAssignedDuties();
    console.log(this.result);
    this.info = await this.adminService.GetAssignDutyInfo();
    console.log(this.info);
    console.log('Here');
  }

  async submitForm(){
    console.log(this.DaySelectValue);
    let allocateModel: AllocateDuty = new AllocateDuty();
    allocateModel.teacherID = this.TeacherSelectValue;
    allocateModel.dutyID = this.DutySelectValue;
    allocateModel.dayID = this.DaySelectValue;
    let response = await this.adminService.AssignDuty(allocateModel);
    console.log(response);
     this.result = await this.adminService.getAssignedDuties();
  }

}