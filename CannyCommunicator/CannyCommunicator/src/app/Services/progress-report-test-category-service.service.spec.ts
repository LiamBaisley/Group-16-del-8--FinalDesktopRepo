import { TestBed } from '@angular/core/testing';

import { ProgressReportTestCategoryServiceService } from './progress-report-test-category-service.service';

describe('ProgressReportTestCategoryServiceService', () => {
  let service: ProgressReportTestCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressReportTestCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
