import { Component, OnInit } from '@angular/core';
import { UpdateParentModel } from 'src/app/Models/update-parent-model';
import { AdminService } from 'src/app/Services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family-account-view',
  templateUrl: './family-account-view.component.html',
  styleUrls: ['./family-account-view.component.scss']
})
export class FamilyAccountViewComponent implements OnInit {
  public detailsForDisplay: UpdateParentModel = new UpdateParentModel();
  public childID: number;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
    ) { }

  async ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.childID = Number(params.get("ID"));
    });
    this.detailsForDisplay = await this.adminService.getFamilyDetails(this.childID);
    console.log(this.detailsForDisplay);
  }

}
