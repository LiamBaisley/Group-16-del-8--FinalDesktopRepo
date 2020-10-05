import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressReportTypesComponent } from './progress-report-types.component';

describe('ProgressReportTypesComponent', () => {
  let component: ProgressReportTypesComponent;
  let fixture: ComponentFixture<ProgressReportTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressReportTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressReportTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
