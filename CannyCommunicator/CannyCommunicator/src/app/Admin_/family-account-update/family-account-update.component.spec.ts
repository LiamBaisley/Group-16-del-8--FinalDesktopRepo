import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccountUpdateComponent } from './family-account-update.component';

describe('FamilyAccountUpdateComponent', () => {
  let component: FamilyAccountUpdateComponent;
  let fixture: ComponentFixture<FamilyAccountUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAccountUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
