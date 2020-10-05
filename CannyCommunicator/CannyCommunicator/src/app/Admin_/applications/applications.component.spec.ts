import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:CannyCommunicator/src/app/Teacher/capture-reports/capture-reports.component.spec.ts
import { CaptureReportsComponent } from './capture-reports.component';

describe('CaptureReportsComponent', () => {
  let component: CaptureReportsComponent;
  let fixture: ComponentFixture<CaptureReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureReportsComponent ]
=======
import { ApplicationsComponent } from './applications.component';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsComponent ]
>>>>>>> 6646d18915eeda9220844bc08f32ccccb9299006:CannyCommunicator/src/app/Admin_/applications/applications.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:CannyCommunicator/src/app/Teacher/capture-reports/capture-reports.component.spec.ts
    fixture = TestBed.createComponent(CaptureReportsComponent);
=======
    fixture = TestBed.createComponent(ApplicationsComponent);
>>>>>>> 6646d18915eeda9220844bc08f32ccccb9299006:CannyCommunicator/src/app/Admin_/applications/applications.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
