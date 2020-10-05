import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtramuralActivityReportComponent } from './extramural-activity-report.component';

describe('ExtramuralActivityReportComponent', () => {
  let component: ExtramuralActivityReportComponent;
  let fixture: ComponentFixture<ExtramuralActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtramuralActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtramuralActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
