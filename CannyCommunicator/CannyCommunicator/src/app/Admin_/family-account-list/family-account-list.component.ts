import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-family-account-list',
  templateUrl: './family-account-list.component.html',
  styleUrls: ['./family-account-list.component.scss']
})
export class FamilyAccountListComponent implements OnInit {
  public Accounts;
  public SearchCriteriaValue: any;
  public thisChildID: number;

  public SearchBoxValue;
  public searchCriteria= {} as any;

  constructor(
    private adminService: AdminService
  ) { }

  async ngOnInit(){
    this.Accounts = await this.adminService.GetAllAccounts();
    console.log(this.Accounts);
  }

  async CheckEmptySearch(){
    if(this.SearchBoxValue == ""){
      this.Accounts = await this.adminService.GetAllAccounts();
    }
  }

  async GetSearchResults(){
    console.log(this.SearchBoxValue);
    this.searchCriteria = this.SearchBoxValue;
    this.Accounts = await this.adminService.GetSearchResults(this.searchCriteria);
    console.log(this.Accounts);
  }
 
  confirmDelete(childID: number){
    this.thisChildID = childID;
    let button = document.getElementById("ConfirmDeleteButton");
    button.click();
  }

  doDelete(){
    let response = this.adminService.DeleteAcccount(this.thisChildID);
  }


}
