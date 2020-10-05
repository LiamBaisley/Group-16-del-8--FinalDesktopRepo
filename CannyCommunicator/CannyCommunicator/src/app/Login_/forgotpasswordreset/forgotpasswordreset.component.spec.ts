import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordresetComponent } from './forgotpasswordreset.component';

describe('ForgotpasswordresetComponent', () => {
  let component: ForgotpasswordresetComponent;
  let fixture: ComponentFixture<ForgotpasswordresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
