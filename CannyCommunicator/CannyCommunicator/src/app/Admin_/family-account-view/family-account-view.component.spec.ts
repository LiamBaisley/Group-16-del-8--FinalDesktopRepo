import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccountViewComponent } from './family-account-view.component';

describe('FamilyAccountViewComponent', () => {
  let component: FamilyAccountViewComponent;
  let fixture: ComponentFixture<FamilyAccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
