import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraMuralComponent } from './extra-mural.component';

describe('ExtraMuralComponent', () => {
  let component: ExtraMuralComponent;
  let fixture: ComponentFixture<ExtraMuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraMuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraMuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
