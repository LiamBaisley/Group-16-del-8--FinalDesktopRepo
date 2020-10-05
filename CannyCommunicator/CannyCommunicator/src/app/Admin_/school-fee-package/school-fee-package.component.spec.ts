import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFeePackageComponent } from './school-fee-package.component';

describe('SchoolFeePackageComponent', () => {
  let component: SchoolFeePackageComponent;
  let fixture: ComponentFixture<SchoolFeePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolFeePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolFeePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
