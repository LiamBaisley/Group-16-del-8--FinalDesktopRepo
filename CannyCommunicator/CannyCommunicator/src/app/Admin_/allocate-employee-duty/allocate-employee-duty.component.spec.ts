import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateEmployeeDutyComponent } from './allocate-employee-duty.component';

describe('AllocateEmployeeDutyComponent', () => {
  let component: AllocateEmployeeDutyComponent;
  let fixture: ComponentFixture<AllocateEmployeeDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateEmployeeDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateEmployeeDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
