import { TestBed } from '@angular/core/testing';

import { ClassGradeService } from './class-grade.service';

describe('ClassGradeService', () => {
  let service: ClassGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
