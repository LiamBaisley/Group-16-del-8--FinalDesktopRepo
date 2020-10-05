import { TestBed } from '@angular/core/testing';

import { CriteriaServiceService } from './criteria-service.service';

describe('CriteriaServiceService', () => {
  let service: CriteriaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
