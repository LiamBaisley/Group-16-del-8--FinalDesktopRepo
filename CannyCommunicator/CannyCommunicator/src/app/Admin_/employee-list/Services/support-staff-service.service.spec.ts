import { TestBed } from '@angular/core/testing';

import { SupportStaffServiceService } from './support-staff-service.service';

describe('SupportStaffServiceService', () => {
  let service: SupportStaffServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportStaffServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
