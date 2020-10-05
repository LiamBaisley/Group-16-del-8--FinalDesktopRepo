import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressReportTestCategoriesComponent } from './progress-report-test-categories.component';

describe('ProgressReportTestCategoriesComponent', () => {
  let component: ProgressReportTestCategoriesComponent;
  let fixture: ComponentFixture<ProgressReportTestCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressReportTestCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressReportTestCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
