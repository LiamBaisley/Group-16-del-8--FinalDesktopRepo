import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './Admin_/admin-home/admin-home.component';
import { SendMessageComponent } from './Admin_/send-message/send-message.component';
import { ProgressReportTypesComponent } from './Admin_/progress-report-types/progress-report-types.component';
import { ProgressReportTestCategoriesComponent } from './Admin_/progress-report-test-categories/progress-report-test-categories.component';
import { DocumentComponent } from './Admin_/Document/document/document.component';
import { FoodItemComponent } from './Admin_/food-item/food-item.component';
import { UserTypeComponent } from './Admin_/user-type/user-type.component';
import { PupilAbsencesComponent} from './Teacher/pupil-absences/pupil-absences.component';
import { MealPlanComponent } from './Admin_/meal-plan/meal-plan.component';
import { SchoolFeePackageComponent } from './Admin_/school-fee-package/school-fee-package.component';
import { ClassGradeComponent} from './Admin_/class-grade/class-grade.component';
import {ExtraMuralComponent} from './Admin_/extra-mural/extra-mural.component';
import {AllocateEmployeeDutyComponent} from './Admin_/allocate-employee-duty/allocate-employee-duty.component';
import {LoginPageComponent} from './Login_/login-page/login-page.component';
import {ChangePasswordComponent} from './Login_/change-password/change-password.component';
import {ResetPasswordComponent} from './Login_/reset-password/reset-password.component';
import {LogoutComponent} from './Login_/logout/logout.component';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { AboutComponent } from './LandingPage/about/about.component';
import { InfoComponent } from './LandingPage/info/info.component';
import { ClassCrudComponent } from './Admin_/class-crud/class-crud.component';
import { EmployeeListComponent } from './Admin_/employee-list/employee-list.component';
import { EmployeeTypeComponent } from './Admin_/employee-type/employee-type.component';
import { FamilyAccountListComponent } from './Admin_/family-account-list/family-account-list.component';
import { FamilyAccountUpdateComponent } from './Admin_/family-account-update/family-account-update.component';
import { FamilyAccountViewComponent } from './Admin_/family-account-view/family-account-view.component';
import { ClassListComponent } from './Admin_/class-list/class-list.component';
import { EmployeeListReportComponent } from './Admin_/employee-list-report/employee-list-report.component';
import { EventsListReportComponent } from './Admin_/events-list-report/events-list-report.component';
import { ExtramuralActivityReportComponent } from './Admin_/extramural-activity-report/extramural-activity-report.component';
import { TeacherHomeComponent } from './Teacher/teacher-home/teacher-home.component';
import { DutyComponent } from './Admin_/duty/duty.component';
import { ExtramuralCompanyComponent } from './Admin_/extramural-company/extramural-company.component';
import { ApplicationsComponent } from './Admin_/applications/applications.component';
import { ApplicationsListComponent } from './Admin_/applications-list/applications-list.component';
import { CaptureReportsComponent } from './Teacher/capture-reports/capture-reports/capture-reports.component';
import { ForgotpasswordresetComponent } from './Login_/forgotpasswordreset/forgotpasswordreset.component';
import { AdminGuardGuard } from './Authorisation/admin-guard.guard';
import { UserGuardGuard } from './Authorisation/user-guard.guard';
import { TeacherGuardGuard } from './Authorisation/teacher-guard.guard';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import { SendMessageGuard } from './Authorisation/send-message.guard';
import { ClassListTeacherComponent } from './Teacher/class-list-teacher/class-list-teacher.component';







const routes: Routes = [
  {path:'SendMessage', component:SendMessageComponent, canActivate: [SendMessageGuard]},
  {path: 'CaptureReports', component: CaptureReportsComponent, canActivate: [TeacherGuardGuard]},
  {path:'', component:LoginPageComponent, pathMatch: 'full'},
  {path: "TeacherHome", component: TeacherHomeComponent, canActivate: [TeacherGuardGuard]},
  {path: 'LoginPage', component:LoginPageComponent},
  {path: 'ChangePassword', component:ChangePasswordComponent},
  {path: 'ResetPassword', component:ResetPasswordComponent},
  {path: 'Logout', component:LogoutComponent},
  {path: "PupilAbsences", component: PupilAbsencesComponent, canActivate: [TeacherGuardGuard]},
  {path: "ForgotPasswordReset/:code/:ID", component: ForgotpasswordresetComponent},
  {path: "Oops", component: GenericErrorComponent},
  {path: "TeacherClassList", component: ClassListTeacherComponent, canActivate: [TeacherGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
