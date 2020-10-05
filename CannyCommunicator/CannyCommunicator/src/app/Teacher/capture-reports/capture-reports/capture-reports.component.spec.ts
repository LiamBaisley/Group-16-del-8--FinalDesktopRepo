import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureReportsComponent } from './capture-reports.component';

describe('CaptureReportsComponent', () => {
  let component: CaptureReportsComponent;
  let fixture: ComponentFixture<CaptureReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
