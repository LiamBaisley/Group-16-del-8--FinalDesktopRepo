import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtramuralCompanyComponent } from './extramural-company.component';

describe('ExtramuralCompanyComponent', () => {
  let component: ExtramuralCompanyComponent;
  let fixture: ComponentFixture<ExtramuralCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtramuralCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtramuralCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
