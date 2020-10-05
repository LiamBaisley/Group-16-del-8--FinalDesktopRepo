import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccountListComponent } from './family-account-list.component';

describe('FamilyAccountListComponent', () => {
  let component: FamilyAccountListComponent;
  let fixture: ComponentFixture<FamilyAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
