import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCrudComponent } from './class-crud.component';

describe('ClassCrudComponent', () => {
  let component: ClassCrudComponent;
  let fixture: ComponentFixture<ClassCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
