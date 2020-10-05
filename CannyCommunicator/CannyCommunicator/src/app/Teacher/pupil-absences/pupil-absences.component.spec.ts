import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilAbsencesComponent } from './pupil-absences.component';

describe('PupilAbsencesComponent', () => {
  let component: PupilAbsencesComponent;
  let fixture: ComponentFixture<PupilAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
