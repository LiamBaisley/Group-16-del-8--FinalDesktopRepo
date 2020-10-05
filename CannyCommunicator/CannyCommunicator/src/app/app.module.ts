import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './Admin_/admin-home/admin-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TeacherHomeComponent } from './Teacher/teacher-home/teacher-home.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SendMessageComponent } from './Admin_/send-message/send-message.component';
import { ProgressReportTypesComponent } from './Admin_/progress-report-types/progress-report-types.component';
import { ProgressReportTestCategoriesComponent } from './Admin_/progress-report-test-categories/progress-report-test-categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DutyComponent } from './Admin_/duty/duty.component';
import { ExtramuralCompanyComponent } from './Admin_/extramural-company/extramural-company.component';
import { DocumentComponent } from './Admin_/Document/document/document.component';
import { FoodItemComponent } from './Admin_/food-item/food-item.component';
import { UserTypeComponent } from './Admin_/user-type/user-type.component';
import { CaptureReportsComponent } from './Teacher/capture-reports/capture-reports/capture-reports.component';
import { PupilAbsencesComponent} from './Teacher/pupil-absences/pupil-absences.component';
import { EmployeeListReportComponent } from './Admin_/employee-list-report/employee-list-report.component';
import { ClassListComponent } from './Admin_/class-list/class-list.component';
import { ExtramuralActivityReportComponent } from './Admin_/extramural-activity-report/extramural-activity-report.component';
import { EventsListReportComponent } from './Admin_/events-list-report/events-list-report.component';
import { MealPlanComponent } from './Admin_/meal-plan/meal-plan.component';
import { SchoolFeePackageComponent } from './Admin_/school-fee-package/school-fee-package.component';
import { ClassGradeComponent } from './Admin_/class-grade/class-grade.component';
import { ExtraMuralComponent } from './Admin_/extra-mural/extra-mural.component';
import { LoginPageComponent } from './Login_/login-page/login-page.component';
import { ChangePasswordComponent } from './Login_/change-password/change-password.component';
import { ResetPasswordComponent } from './Login_/reset-password/reset-password.component';
import { LogoutComponent } from './Login_/logout/logout.component';
import { AllocateEmployeeDutyComponent } from './Admin_/allocate-employee-duty/allocate-employee-duty.component';
import { AboutComponent } from './LandingPage/about/about.component';
import { InfoComponent } from './LandingPage/info/info.component';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { ClassCrudComponent } from './Admin_/class-crud/class-crud.component';
import { EmployeeListComponent } from './Admin_/employee-list/employee-list.component';
import { EmployeeTypeComponent } from './Admin_/employee-type/employee-type.component';
import { FamilyAccountListComponent } from './Admin_/family-account-list/family-account-list.component';
import { FamilyAccountUpdateComponent } from './Admin_/family-account-update/family-account-update.component';
import { FamilyAccountViewComponent } from './Admin_/family-account-view/family-account-view.component';
import { ForgotpasswordresetComponent } from './Login_/forgotpasswordreset/forgotpasswordreset.component';
import { JWTInterceptor } from './Helpers/jwt.interceptor';
import { EmpTypeService } from 'src/app/Services/emp-type.service';
import { EmpTypeCrud } from 'src/app//Models/emp-type-crud';
import { ApplicationsComponent } from './Admin_/applications/applications.component';

import { ApplicationsListComponent } from './Admin_/applications-list/applications-list.component';
import { ApplicationsService } from './Services/applications.service';
import { ErrorInterceptor } from './Helpers/error.interceptor';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import 'font-awesome/less/font-awesome.less';
import { ClassListTeacherComponent } from './Teacher/class-list-teacher/class-list-teacher.component'

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsListComponent,
    ApplicationsComponent,
    ClassCrudComponent,
    EmployeeListComponent,
    EmployeeTypeComponent,
    FamilyAccountListComponent,
    FamilyAccountUpdateComponent,
    FamilyAccountViewComponent,
    AdminHomeComponent,
    SendMessageComponent,
    TeacherHomeComponent,
    ProgressReportTypesComponent,
    ProgressReportTestCategoriesComponent,
    DutyComponent,
    ExtramuralCompanyComponent,
    DocumentComponent,
    FoodItemComponent,
    UserTypeComponent,
    EmployeeListReportComponent,
    ClassListComponent,
    ExtramuralActivityReportComponent,
    EventsListReportComponent,
    MealPlanComponent,
    SchoolFeePackageComponent,
    ClassGradeComponent,
    ExtraMuralComponent,
    LoginPageComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
    AllocateEmployeeDutyComponent,
    LandingPageComponent,
    AboutComponent,
    InfoComponent,
    PupilAbsencesComponent,
    ForgotpasswordresetComponent,
    CaptureReportsComponent,
    GenericErrorComponent,
    ClassListTeacherComponent
    
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
     
    ]),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    EmpTypeService,HttpClientModule,ApplicationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
