import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListReportComponent } from './events-list-report.component';

describe('EventsListReportComponent', () => {
  let component: EventsListReportComponent;
  let fixture: ComponentFixture<EventsListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
